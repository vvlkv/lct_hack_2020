import 'package:flutter/material.dart';
import 'package:lct/Components/HexColor.dart';
import 'package:lct/Core/HttpClient.dart';

class ObjectsRoute extends StatelessWidget {

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
          title: Text("Объекты"),
          backgroundColor: HexColor.fromHex('A8012D'),
      ),
      backgroundColor: HexColor.fromHex('EFF2F9'),
      body: Objects()
    );
  }
}

class Objects extends StatefulWidget {

  @override
  State<StatefulWidget> createState() => ObjectsState();
}

class ObjectsState extends State<Objects> {

  HttpClient client = HttpClient();
  List<Object> objects = [
    Object("ЖК «Михайловский парк»", AssetImage('graphics/realty_large 1.jpg'), "Улица 2-я Институтская"),
    Object("ЖК «Люблинский парк»", AssetImage('graphics/realty_large 2.jpg'), "Улица Люблинская, вл. 72"),
    Object("ЖК «Полярная 25»", AssetImage('graphics/realty_large 3.jpg'), "Улица Полярная, 25"),
  ];

  Widget loaderWidget() {
    return Center(
      child: CircularProgressIndicator(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: client.objects(),
      builder: (context, snapshot) {
        switch (snapshot.connectionState) {
          case ConnectionState.waiting:
            return loaderWidget();
          default:
            if (snapshot.hasError)
              return loaderWidget();
            return Container(
              child: ListView.separated(
                  padding: EdgeInsets.all(16),
                  separatorBuilder: (BuildContext context, int index) {
                    return SizedBox(height: 22);
                  },
                  itemCount: objects.length,
                  itemBuilder: (BuildContext context, int index) {
                    return Card(
                      child: SizedBox(
                        height: 252,
                        child: InkWell(
                          onTap: () {
                            print(objects[index].name);
                            Navigator.pop(context, objects[index].address);
                          },
                          child: Stack(
                            children: [
                              Padding(
                                padding: EdgeInsets.fromLTRB(12, 29, 0, 0),
                                child: Text(objects[index].name),
                              ),
                              Positioned(
                                  child: new Align(
                                      alignment: FractionalOffset.center,
                                      child: Padding(
                                          padding: EdgeInsets.fromLTRB(12, 0, 12, 0),
                                          child: Image(
                                              height: 122,
                                              image: objects[index].image,
                                              fit: BoxFit.fill
                                          )
                                      )
                                  )
                              ),
                              Container(
                                alignment: Alignment.bottomLeft,
                                child: Padding(
                                  padding: EdgeInsets.fromLTRB(12, 0, 0, 20),
                                  child: Text(objects[index].address),
                                ),
                              )
                            ],
                          ),
                        )
                    ),
                    );
                  },
              ),
            );
        }
      },
    );
  }
}