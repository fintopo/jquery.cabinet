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

default: `width`

This option refers to the method of slide.

## open

`boolean`

default: `false`

If true, show the cabinet.

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

## appendDrawers

## removeDrawers

This method removes all drawers;

```
$('.cabinet').cabinet('removeDrawers');
```

## removeDrawer

This method removes the drawer of index number;

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

- Ver.1.0.0 (2015/01/04)
