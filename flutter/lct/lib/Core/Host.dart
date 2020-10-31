class Host {
  static String host = "https://jsonplaceholder.typicode.com/";
  // static String host = "jsonplaceholder.typicode.com/";

  static String append(String route) {
    return host + route;
  }

  static Uri build(String route, {Map<String, String> parameters}) {
    return Uri.https(host, route, parameters);
  }
}