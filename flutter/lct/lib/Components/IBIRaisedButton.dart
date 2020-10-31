import 'package:flutter/material.dart';

class IBIRaisedButton extends RaisedButton {

  IBIRaisedButton(VoidCallback onPressed, Widget child, [Color color]): super(
      color: color,
      onPressed: onPressed,
      child: child,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(10),
        side: BorderSide(color: Colors.black)
      ),
      textColor: Colors.white
  );
}

class IBIButton extends Container {

  IBIButton(
      String hint,
      VoidCallback callback,
      [Color color = Colors.grey]
      ): super(height: 60, child: IBIRaisedButton(callback, Text(hint), color));
}