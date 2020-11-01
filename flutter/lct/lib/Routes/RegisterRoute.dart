import 'package:flutter/material.dart';
import 'package:lct/Components/HexColor.dart';
import 'package:lct/Components/IBIProgressHUD.dart';
import 'package:lct/Components/IBIRaisedButton.dart';
import 'package:lct/Components/IBITextField.dart';
import 'package:lct/Core/HttpClient.dart';

class RegisterRouter extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Регистрация"),
        backgroundColor: HexColor.fromHex('A8012D'),
      ),
      resizeToAvoidBottomInset: true,
      backgroundColor: HexColor.fromHex('EFF2F9'),
      body: Register(),
    );
  }
}

class Register extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => RegisterState();
}

class RegisterState extends State<Register> {

  String firstName;
  String lastName;
  String surname;
  String specialization;
  String phone;
  String owner;

  HttpClient client = HttpClient();
  bool isLoading = false;

  void register() {
    setState(() {
      isLoading = true;
    });
    client.register(firstName, lastName, surname, specialization, phone, owner).then((value) {
      setState(() {
        isLoading = false;
        Navigator.popUntil(context, (route) => route.isFirst);
      });
    });
  }

  @override
  Widget build(BuildContext context) {
    // TODO: implement build
    return IBIProgressHUD(Stack(
      children: [
        ListView(
          padding: EdgeInsets.fromLTRB(16, 16, 16, 128),
          children: [
            IBITextField("Имя", (text) {
              firstName = text;
            }),
            SizedBox(height: 16),
            IBITextField("Фамилия", (text) {
              lastName = text;
            }),
            SizedBox(height: 16),
            IBITextField("Отчество", (text) {
              surname = text;
            }),
            SizedBox(height: 16),
            IBITextField("Специальность", (text) {
              specialization = text;
            }),
            SizedBox(height: 16),
            IBITextField("Номер телефона", (text) {
              phone = text;
            }),
            SizedBox(height: 16),
            IBITextField("Застройщик", (text) {
              owner = text;
            }),
            SizedBox(height: 16),
            IBITextField("Пароль", (text) {
              owner = text;
            }),
          ],
        ),
        Positioned(
            child: new Align(
                alignment: FractionalOffset.bottomCenter,
                child: Padding(
                    padding: EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.stretch,
                      mainAxisSize: MainAxisSize.max,
                      mainAxisAlignment: MainAxisAlignment.end,
                      children: [
                        IBIButton('Зарегистрироваться', () {
                          register();
                        }, Colors.black),
                      ],
                    )
                )
            )
        ),
      ],
    ), isLoading);
  }
}