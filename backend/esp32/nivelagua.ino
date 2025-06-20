## 1. ESP32 (Cód. Arduino) - Sensor Ultrassônico HC-SR04


#include <WiFi.h>
#include <HTTPClient.h>

const char* ssid = "SEU_WIFI";
const char* password = "SUA_SENHA";
const char* serverName = "http://SEU_SERVIDOR:3000/api/waterlevel";

const int trigPin = 5;
const int echoPin = 18;

void setup() {
  Serial.begin(115200);
  WiFi.begin(ssid, password);

  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("Connecting...");
  }
  Serial.println("Connected!");
}

void loop() {
  long duration;
  float distance;

  digitalWrite(trigPin, LOW);
  delayMicroseconds(2);
  digitalWrite(trigPin, HIGH);
  delayMicroseconds(10);
  digitalWrite(trigPin, LOW);

  duration = pulseIn(echoPin, HIGH);
  distance = duration * 0.034 / 2;

  if(WiFi.status() == WL_CONNECTED){
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    String httpRequestData = "{\"level\":" + String(distance) + "}";
    int httpResponseCode = http.POST(httpRequestData);
    http.end();
  }
  delay(5000);
}
