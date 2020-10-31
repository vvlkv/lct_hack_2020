import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'Host.dart';

class HttpClient {

  Future mockCall() async {
    return await Future.delayed(Duration(seconds: 1));
  }

  Future authNew(String login, String password) async {
    var parameters = {
      'login': login,
      'pass': password,
    };
    final response = await http.get(Host.build("token", parameters: parameters));
    return response;
  }

  Future auth() async {
    return mockCall();
    final response = await http.get(Host.append("albums/1"));
    print(response.body);
    return response;
  }

  Future<List<Object>> objects() async {
    return await mockCall().whenComplete(() {
      return [Object("ЖК «Полярная 25»", AssetImage('graphics/realty_large 3.png'), "Улица Полярная, 25")];
    });
  }

  Future register(
      String firstName,
      String lastName,
      String surname,
      String specialization,
      String phone,
      String owner) async {
    return mockCall();
  }
}

class Object {
  String name;
  AssetImage image;
  String address;

  Object(String name, AssetImage image, String address) {
    this.name = name;
    this.image = image;
    this.address = address;
  }
}