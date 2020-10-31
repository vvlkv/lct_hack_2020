import 'package:flutter/material.dart';
import 'package:lct/Components/HexColor.dart';
import 'package:modal_progress_hud/modal_progress_hud.dart';

class IBIProgressHUD extends ModalProgressHUD {

  IBIProgressHUD(
      Widget child,
      bool inAsyncCall): super(
    child: child,
    progressIndicator: CircularProgressIndicator(valueColor: AlwaysStoppedAnimation<Color>(HexColor.fromHex('A8012D'))),
    inAsyncCall: inAsyncCall
  );
}