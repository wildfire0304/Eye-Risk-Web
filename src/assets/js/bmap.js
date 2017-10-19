!(function (e, t) {
  typeof exports === 'object' && typeof module === 'object' ? module.exports = t(require('echarts')) : typeof define === 'function' && define.amd ? define(['echarts'], t) : typeof exports === 'object' ? exports.bmap = t(require('echarts')) : (e.echarts = e.echarts || {}, e.echarts.bmap = t(e.echarts))
}(this, function (e) {
  return (function (e) {
    function t (n) {
      if (o[n]) return o[n].exports
      var r = o[n] = {
        exports: {},
        id: n,
        loaded: !1
      }
      return e[n].call(r.exports, r, r.exports, t), r.loaded = !0, r.exports
    }
    var o = {}
    return t.m = e, t.c = o, t.p = '', t(0)
  }([function (e, t, o) {
    var n
    n = (function (e) {
      return o(1).registerCoordinateSystem('bmap', o(2)), o(3), o(4), o(1).registerAction({
        type: 'bmapRoam',
        event: 'bmapRoam',
        update: 'updateLayout'
      }, function (e, t) {
        t.eachComponent('bmap', function (e) {
          var t = e.getBMap(),
            o = t.getCenter()
          e.setCenterAndZoom([o.lng, o.lat], t.getZoom())
        })
      }), {
        version: '1.0.0'
      }
    }.call(t, o, t, e)), !(void 0 !== n && (e.exports = n))
  }, function (t, o) {
    t.exports = e
  }, function (e, t, o) {
    var n
    n = (function (e) {
      function t (e, t) {
        this._bmap = e, this.dimensions = ['lng', 'lat'], this._mapOffset = [0, 0], this._api = t
      }

      function n () {
        function e (e) {
          this._root = e
        }
        return e.prototype = new BMap.Overlay(), e.prototype.initialize = function (e) {
          return e.getPanes().labelPane.appendChild(this._root), this._root
        }, e.prototype.draw = function () {}, e
      }
      var r = o(1)
      t.prototype.dimensions = ['lng', 'lat'], t.prototype.setMapOffset = function (e) {
        this._mapOffset = e
      }, t.prototype.getBMap = function () {
        return this._bmap
      }, t.prototype.dataToPoint = function (e) {
        var t = new BMap.Point(e[0], e[1]),
          o = this._bmap.pointToOverlayPixel(t),
          n = this._mapOffset
        return [o.x - n[0], o.y - n[1]]
      }, t.prototype.pointToData = function (e) {
        var t = this._mapOffset,
          e = this._bmap.overlayPixelToPoint({
            x: e[0] + t[0],
            y: e[1] + t[1]
          })
        return [e.lng, e.lat]
      }, t.prototype.getViewRect = function () {
        var e = this._api
        return new r.graphic.BoundingRect(0, 0, e.getWidth(), e.getHeight())
      }, t.prototype.getRoamTransform = function () {
        return r.matrix.create()
      }
      var a
      return t.dimensions = t.prototype.dimensions, t.create = function (e, o) {
        var r, i = o.getDom()
        e.eachComponent('bmap', function (e) {
          var p = o.getZr().painter.getViewportRoot()
          if (typeof BMap === 'undefined') throw new Error('BMap api is not loaded')
          if (a = a || n(), r) throw new Error('Only one bmap component can exist')
          if (!e.__bmap) {
            var s = i.querySelector('.ec-extension-bmap')
            s && (p.style.left = '0px', p.style.top = '0px', i.removeChild(s)), s = document.createElement('div'), s.style.cssText = 'width:100%;height:100%', s.classList.add('ec-extension-bmap'), i.appendChild(s)
            var c = e.__bmap = new BMap.Map(s),
              m = new a(p)
            c.addOverlay(m)
          }
          var c = e.__bmap,
            l = e.get('center'),
            d = e.get('zoom')
          if (l && d) {
            var f = new BMap.Point(l[0], l[1])
            c.centerAndZoom(f, d)
          }
          r = new t(c, o), r.setMapOffset(e.__mapOffset || [0, 0]), e.coordinateSystem = r
        }), e.eachSeries(function (e) {
          e.get('coordinateSystem') === 'bmap' && (e.coordinateSystem = r)
        })
      }, t
    }.call(t, o, t, e)), !(void 0 !== n && (e.exports = n))
  }, function (e, t, o) {
    var n
    n = (function (e) {
      function t (e, t) {
        return e && t && e[0] === t[0] && e[1] === t[1]
      }
      return o(1).extendComponentModel({
        type: 'bmap',
        getBMap: function () {
          return this.__bmap
        },
        setCenterAndZoom: function (e, t) {
          this.option.center = e, this.option.zoom = t
        },
        centerOrZoomChanged: function (e, o) {
          var n = this.option
          return !(t(e, n.center) && o === n.zoom)
        },
        defaultOption: {
          center: [104.114129, 37.550339],
          zoom: 5,
          mapStyle: {},
          roam: !1
        }
      })
    }.call(t, o, t, e)), !(void 0 !== n && (e.exports = n))
  }, function (e, t, o) {
    var n
    n = (function (e) {
      return o(1).extendComponentView({
        type: 'bmap',
        render: function (e, t, o) {
          function n () {
            r || o.dispatchAction({
              type: 'bmapRoam'
            })
          }
          var r = !0,
            a = e.getBMap(),
            i = o.getZr().painter.getViewportRoot(),
            p = e.coordinateSystem,
            s = function (t, n) {
              if (!r) {
                var a = i.parentNode.parentNode.parentNode,
                  s = [-parseInt(a.style.left, 10) || 0, -parseInt(a.style.top, 10) || 0]
                i.style.left = s[0] + 'px', i.style.top = s[1] + 'px', p.setMapOffset(s), e.__mapOffset = s, o.dispatchAction({
                  type: 'bmapRoam'
                })
              }
            }
          a.removeEventListener('moving', this._oldMoveHandler), a.removeEventListener('zoomend', this._oldZoomEndHandler), a.addEventListener('moving', s), a.addEventListener('zoomend', n), this._oldMoveHandler = s, this._oldZoomEndHandler = n
          var c = e.get('roam')
          c && c !== 'scale' ? a.enableDragging() : a.disableDragging(), c && c !== 'move' ? (a.enableScrollWheelZoom(), a.enableDoubleClickZoom(), a.enablePinchToZoom()) : (a.disableScrollWheelZoom(), a.disableDoubleClickZoom(), a.disablePinchToZoom())
          var m = e.__mapStyle,
            l = e.get('mapStyle') || {},
            d = JSON.stringify(l)
          JSON.stringify(m) !== d && (Object.keys(l).length && a.setMapStyle(l), e.__mapStyle = JSON.parse(d)), r = !1
        }
      })
    }.call(t, o, t, e)), !(void 0 !== n && (e.exports = n))
  }]))
}))
