jquery.cabinet
==============

jQuery plug-in that make the slide area with multiple panels.

Demo
====

[demo](http://fintopo.github.io/jquery.cabinet/)


Options
=======

## position

`left` or `right` or `top` or `bottom`

default: `left`

This option refers to the direction of slide.

## mode

`width` or `position`

default: `position`

This option refers to the method of slide.

## open

`boolean` or `number`

default: `false`

If true, open the first drawer of cabinet.
If number, open the specified drawer.

## minSize

default: `10`

When you change the size in drag, and closes automatically when than this size becomes smaller.

## closeWidth

default: `0`

## closeHeight

default: `0`

## classOpen

default: `cabinet-open`

## classClose

default: `cabinet-close`

## classExpand

default: `cabinet-expand`

## classDrawerOpen

default: `drawer-open`

## classDrawerClose

default: `drawer-close`

## drawers

`array`

In addition to the drawer that was written in HTML, you can add a drawer in this option. 
And there are methods of additional or remove.

Methods
=======

## destroy

## isOpen

## toggle

## open

## close

## reset

## countDrawers

This method returns the number of drawers.

## appendDrawers

This method appends drawers.

If option `remove` is true, remove all existing drawers.
If option `remove` is number, remove the drawer of number.

If option `open` is true, open the cabinet.

```
$('.cabinet').cabinet('appendDrawers', {
  'drawers': [{
    'knob': 'knob title'
    ,'box': 'box text'
  }]
  ,'remove': true
  ,'open': true
});
```

## removeDrawers

This method removes all drawers.

```
$('.cabinet').cabinet('removeDrawers');
```

## removeDrawer

This method removes the drawer of index number.

```
$('.cabinet').cabinet('removeDrawer', 0);
```

## getDrawer

Events
======

## onOpen

## onBeforeOpen

## onClose
## onBeforeClose
## onMouseDown
## onMouseUp


License
=======

jquery.cabinet is released under the MIT license.

Change Log
==========

- Ver.1.5.0 (2015-09-25)
 - Bug fixed #19.
- Ver.1.4.0 (2015-09-20)
 - Append function #6, #18.
 - Bug fixed #14, #15, #16.
- Ver.1.3.0 (2015/05/06)
 - Bug fixed #17.
- Ver.1.2.0 (2015/01/14)
 - Append the type `number` to option `open`.(#4)
 - Bug fixed that the knob is hidden in drag when the option `mode` to `position`.(#8)
- Ver.1.1.0 (2015/01/09)
 - Default `position` of the option `mode`.
 - Bug fixed that does not add `classDrawerOpen` by method `open`.
 - Append option of method `appendDrawers`.
 - Append method `removeDrawers`.
 - Method call before initializing was set to be disabled.
- Ver.1.0.0 (2015/01/04)
