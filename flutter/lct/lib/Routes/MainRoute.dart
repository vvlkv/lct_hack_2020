import 'package:flutter/material.dart';
import 'package:flutter/widgets.dart';
import 'package:lct/Components/IBITextField.dart';
import 'package:lct/Core/HttpClient.dart';
import 'package:lct/Routes/RegisterRoute.dart';
import 'OnBuildingRoute.dart';
import '../Components/IBIProgressHUD.dart';
import '../Components/IBIRaisedButton.dart';
import '../Components/HexColor.dart';

class MainRoute extends StatelessWidget {
  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Flutter Demo',
      theme: ThemeData(),
      home: MainPage(title: 'В стройке'),
    );
  }
}

class MainPage extends StatefulWidget {
  MainPage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MainPageState createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> {

  HttpClient client = HttpClient();
  bool onLoading = false;
  String firstName = "";
  String lastName = "";

  void auth() {
    setState(() {
      onLoading = true;

    });
    client.auth().then((value) {
      setState(() {
        onLoading = false;
      });
      Navigator.push(
          context,
          MaterialPageRoute(builder: (context) => OnBuildingRoute()));
    }).catchError((error) => {});
  }

  void register() {
    Navigator.push(
        context,
        MaterialPageRoute(builder: (context) => RegisterRouter()));
  }

  @override
  void initState() {
    super.initState();
    onLoading = false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: HexColor.fromHex('EFF2F9'),
        resizeToAvoidBottomInset: false,
        body: IBIProgressHUD(Container(
          child: Stack(children: [
          //   Positioned(
          //     child: new Align(
          //       alignment: FractionalOffset.topCenter,
          //       child: Padding(
          //         padding: EdgeInsets.all(128),
          //         child: Image(
          //             image: AssetImage('graphics/department.jpg')
          //         ),
          //       )
          //     )
          // ),
          Padding(
            padding: EdgeInsets.all(16),
            child: Column(
              mainAxisAlignment: MainAxisAlignment.start,
              children: [
                SizedBox(height: 64),
                Image(image: AssetImage('graphics/department.png')),
                Text(
                    'На стройке',
                    textAlign: TextAlign.center,
                    style: TextStyle(height: 5, fontSize: 32)
                ),
                // SizedBox(height: 64),
                IBITextField("Логин", (text) {
                }),
                SizedBox(height: 10),
                IBITextField("Пароль", (text) {
                }),
              ],
            )
          ),
          // Column(
          //   mainAxisAlignment: MainAxisAlignment.end,
          //   crossAxisAlignment: CrossAxisAlignment.stretch,
          //   children: [
          //     Container(
          //       decoration: BoxDecoration(
          //         image: DecorationImage(
          //           image: AssetImage('graphics/wall.png'),
          //           fit: BoxFit.fitWidth,
          //         ),
          //       ),
          //     )
          //   ],
          // ),
          // Positioned(
          //     child: new Align(
          //         alignment: FractionalOffset.bottomCenter,
          //         child: Image(
          //           height: 240,
          //             image: AssetImage('graphics/wall.png'),
          //             fit: BoxFit.fill
          //         )
          //     )
          // ),
            // Positioned(
            //     child: new Align(
            //         alignment: FractionalOffset.bottomCenter,
            //         child: Container(
            //           decoration: BoxDecoration(
            //             image: DecorationImage(
            //               image: AssetImage('graphics/wall.png'),
            //               fit: BoxFit.fitWidth,
            //             ),
            //           ),
            //         )
            //     )
            // ),
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
                        IBIButton('Авторизоваться', () {
                          auth();
                        }, HexColor.fromHex('A8002C')),
                        SizedBox(height: 16),
                        IBIButton('Зарегистрироваться', () {
                          register();
                        }, Colors.black),
                      ],
                    )
                  )
              )
          ),
        ],),
      ),
      onLoading)
    );
  }
}