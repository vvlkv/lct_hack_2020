import 'package:flutter/material.dart';

class IBITextField extends TextField {

  IBITextField(String text, ValueChanged<String> onChanged): super(
      decoration: InputDecoration(
          border: OutlineInputBorder(
              borderRadius: const BorderRadius.all(Radius.circular(16))
          ),
          hintText: text,
          filled: true,
          fillColor: Colors.white
      ),
  );
}