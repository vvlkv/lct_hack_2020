import 'package:flutter/material.dart';
import 'package:lct/Components/HexColor.dart';
import 'package:lct/Components/IBIProgressHUD.dart';
import 'package:lct/Components/IBIRaisedButton.dart';
import 'package:lct/Core/HttpClient.dart';

class OnWorkRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("На объекте"),
        backgroundColor: HexColor.fromHex('A8012D'),
      ),
        backgroundColor: HexColor.fromHex('EFF2F9'),
      body: OnWork()
      // Center(
      //   child: Column(
      //     mainAxisAlignment: MainAxisAlignment.center,
      //     children: [
      //       ElevatedButton(
      //         onPressed: () {
      //           print('SOS');
      //         },
      //         child: Text('SOS'),
      //       ),
      //       ElevatedButton(
      //         onPressed: () {
      //           Navigator.popUntil(context, (route) => route.isFirst);
      //         },
      //         child: Text('Завершить работу'),
      //       ),
      //     ],
      //   ),
      // ),
    );
  }
}

class OnWork extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => OnWorkState();
}

class OnWorkState extends State<OnWork> {

  bool isLoading = false;

  HttpClient client = HttpClient();

  void sendSos() {
    setState(() {
      isLoading = true;
    });
    client.sendSos().then((value) {
      setState(() {
        isLoading = false;
      });
      Scaffold.of(context).showSnackBar(SnackBar(content: Text("Помощь скоро будет!")));
    });
  }

  @override
  Widget build(BuildContext context) {
    return IBIProgressHUD(Container(
      child: Stack(
        children: [
          Center(
              child: FlatButton(
                  child: Image.asset('graphics/sos.png'),
                  onPressed: () {
                    sendSos();
                  })
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
                          IBIButton('Завершить работу', () {
                            Navigator.popUntil(context, (route) => route.isFirst);
                          }, Colors.black),
                        ],
                      )
                  )
              )
          ),
        ],
      ),
    ), isLoading);
  }
}