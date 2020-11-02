import React, { Component } from 'react';
import PropTypes from 'prop-types';

const eventHandlers = {
  // Editing events.
  onEditing: 'editable:editing',
  onEnable: 'editable:enable',
  onDisable: 'editable:disable',

  // Drawing events
  onStartDrawing: 'editable:drawing:start',
  onDrawingClick: 'editable:drawing:click',
  onDrawingCommit: 'editable:drawing:commit',
  onDrawingMouseDown: 'editable:drawing:mousedown',
  onDrawingMouseUp: 'editable:drawing:mouseup',
  onDrawingMove: 'editable:drawing:move',
  onCancelDrawing: 'editable:drawing:cancel',
  onEndDrawing: 'editable:drawing:end',

  // Dragging events
  onDragStart: 'editable:dragstart',
  onDrag: 'editable:drag',
  onDragEnd: 'editable:dragend',
  onVertexMarkerDrag: 'editable:vertex:drag',
  onVertexMarkerDragStart: 'editable:vertex:dragstart',
  onVertexMarkerDragEnd: 'editable:vertex:dragend',

  // Vertex events
  onVertextCtrlClick: 'editable:vertex:ctrlclick',
  onNewVertex: 'editable:vertex:new',
  onVertexMarkerClick: 'editable:vertex:click',
  onVertexRawMarkerClick: 'editable:vertex:rawclick',
  onVertexDeleted: 'editable:vertex:deleted',
  onVertexMarkerCtrlClick: 'editable:vertex:ctrlclick',
  onVertexMarkerShiftClick: 'editable:vertex:shiftclick',
  onVertexMarkerMetaKeyClick: 'editable:vertex:metakeyclick',
  onVertexMarkerAltClick: 'editable:vertex:altclick',
  onVertexMarkerContextMenu: 'editable:vertex:contextmenu',
  onVertexMarkerMouseDown: 'editable:vertex:mousedown',
  onVertexMarkerMouseOver: 'editable:vertex:mouseover',
  onVertexMarkerMouseOut: 'editable:vertex:mouseout',
  onMiddleMarkerMouseDown: 'editable:middlemarker:mousedown',

  // Shape events
  onShapeNew: 'editable:shape:new',
  onShapeDelete: 'editable:shape:delete',
  onShapeDeleted: 'editable:shape:deleted',
};

function registerEventHandlerDefaultProps() {
  const ret = {};
  Object.keys(eventHandlers).forEach((key) => {
    ret[key] = () => {};
  });
  return ret;
}
function registerEventHandlerPropTypes() {
  const ret = {};
  Object.keys(eventHandlers).forEach((key) => {
    ret[key] = PropTypes.func;
  });
  return ret;
}

export default class ReactLeafletEditable extends Component {
  static defaultProps = {
    ...registerEventHandlerDefaultProps(),
    children: null,
  };

  static propTypes = {
    ...registerEventHandlerPropTypes(),
    children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  };

  constructor() {
    super();
    this.state = {
      map: null,
    };
  }

  componentDidMount() {
    const { children } = this.props;
    const mapComponent = this.childrenMap(children);

    if (!mapComponent) {
      console.error(
        'ERROR: ReactLeafletEditable must have a react-leaflet Map component (or similar) as a child'
      );
      return;
    }
    if (!mapComponent.ref) {
      console.error('ERROR: ReactLeafletEditable child Map component must add ref attribute.');
      return;
    }
    if (!this._isMapEditable(mapComponent.props)) {
      console.error(
        'ERROR: ReactLeafletEditable child Map component must add editable={true} attribute'
      );
      return;
    }

    this._initMap(mapComponent.ref.current.leafletElement);
  }

  componentWillUnmount() {
    this._unregisterListeners();
  }

  _initMap = (map) => {
    this.setState(
      {
        map,
      },
      () => {
        this._registerListeners();
      }
    );
  };

  _registerListeners = () => {
    const { map } = this.state;
    Object.keys(eventHandlers).forEach((key) => {
      if (map) {
        map.on(eventHandlers[key], (e) => {
          const { [key]: propValue } = this.props;
          propValue(e, map);
        });
      }
    });
  };

  _unregisterListeners = () => {
    const { map } = this.state;
    if (!map) return;
    Object.keys(eventHandlers).forEach((key) => {
      map.off(eventHandlers[key]);
    });
  };

  _check = () => {
    const { map } = this.state;
    if (!map) return false;

    if (!map.editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return false;
    }

    return true;
  };

  drawing = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.drawing();
  };

  stopDrawing = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.stopDrawing();
  };

  commitDrawing = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.commmitDrawing();
  };

  startPolygon = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startPolygon();
  };

  startPolyline = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startPolyline();
  };

  startMarker = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startMarker();
  };

  startRectangle = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startRectangle();
  };

  startCircle = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startCircle();
  };

  startHole = (editor, latlng) => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.startHole(editor, latlng);
  };

  clearAll = () => {
    const { map } = this.state;
    if (!map) return null;

    const { editTools } = map;
    if (!editTools) {
      console.error(
        'ERROR: editTools not present. Please install and call `import "leaflet-editable"`'
      );
      return null;
    }

    return editTools.clearLayers();
  };

  childrenMap = (children, mapComponent = null) => {
    React.Children.map(children, (child) => {
      if (child.type && child.type.prototype && child.type.prototype.createLeafletElement) {
        // eslint-disable-next-line no-param-reassign
        mapComponent = child;
      }
    });
    if (mapComponent) return mapComponent;
    if (Array.isArray(children)) {
      for (let i = 0; i < children.length; i += 1) {
        return this.childrenMap(children[i], mapComponent);
      }
    }
    if (!children) return null;
    if (!children.props) return null;
    if (children.props.children) {
      return this.childrenMap(children.props.children, mapComponent);
    }
    return null;
  };

  _isMapEditable(props) {
    return props.editable;
  }

  render() {
    const { children } = this.props;
    return children;
  }
}
