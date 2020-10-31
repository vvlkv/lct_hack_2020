import 'package:flutter/material.dart';
import 'package:lct/Components/HexColor.dart';
import 'package:lct/Components/IBIProgressHUD.dart';
import 'package:lct/Components/IBIRaisedButton.dart';
import 'package:lct/Core/HttpClient.dart';
import 'package:lct/Routes/ObjectsRoute.dart';
import 'ObjectsRoute.dart';
import 'OnWorkRoute.dart';

class OnBuildingRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: HexColor.fromHex('EFF2F9'),
      appBar: AppBar(
        title: Text('Начать работу'),
        backgroundColor: HexColor.fromHex('A8012D'),
      ),
      body: OnBuilding()
    );
  }
}

class OnBuilding extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => OnBuildingState();
}

class OnBuildingState extends State<OnBuilding> {

  HttpClient client = HttpClient();
  bool onLoading = false;
  String selectedAddress = "ул. Стремянная 124";

  void load() {
    setState(() {
      onLoading = true;
    });
    client.auth().then((value) {
      setState(() {
        onLoading = false;
      });
      Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => OnWorkRoute())
      );
    });
  }

  void showObjectAndGetSelection(BuildContext context) async {
    final result = await Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => ObjectsRoute())
    );
    setState(() {
      selectedAddress = result as String;
    });
  }

  @override
  Widget build(BuildContext context) {
    return IBIProgressHUD(Container(
      child: Stack(
        children: [
          Container(
            alignment: Alignment.topCenter,
            child: Padding(
              padding: EdgeInsets.all(32),
              child: Text(
                "Объект:\n$selectedAddress",
                style: TextStyle(color: Colors.black, fontSize: 24, fontWeight: FontWeight.bold),
                textAlign: TextAlign.center,
              ),
            )
          ),
          Center(
            child: FlatButton(
              child: Image.asset('graphics/startWork.png'),
              onPressed: () {
                load();
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
                          IBIButton('Уточнить объект', () {
                            showObjectAndGetSelection(context);
                          }, Colors.black),
                        ],
                      )
                  )
              )
          ),
        ],
      ),
    ), onLoading);
    return IBIProgressHUD(Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          "Объект:",
          style: Theme.of(context).textTheme.headline3,
        ),
        Text(
          "ул. Стремянная 124",
          style: Theme.of(context).textTheme.headline4,
        ),
        SizedBox(height: 48),
        Padding(
          padding: EdgeInsets.all(32),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.stretch,
            children: [
              ButtonTheme(
                height: 48,
                child: IBIRaisedButton(
                      () {
                    load();
                  },
                  Text('Начать работу'),
                ),
              ),
              SizedBox(height: 16),
              ButtonTheme(
                height: 48,
                child: IBIRaisedButton(
                      () {
                    Navigator.push(
                        context,
                        MaterialPageRoute(builder: (context) => ObjectsRoute())
                    );
                  },
                  Text('Уточнить объект'),
                ),
              )
            ],
          ),
        )

      ],
    ), onLoading);
  }
}