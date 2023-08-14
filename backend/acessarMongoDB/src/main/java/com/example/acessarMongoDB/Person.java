package com.example.acessarMongoDB;

import org.springframework.data.annotation.Id;

public class Person {

  @Id private String id;

  private String firstName;
  private String lastName;
  private String image;

  public String getFirstName() {
    return firstName;
  }

  public void setFirstName(String firstName) {
    this.firstName = firstName;
  }

  public String getLastName() {
    return lastName;
  }

  public void setLastName(String lastName) {
    this.lastName = lastName;
  }

  public String getImage() {
    return image;
  }

  public void setImage(String image) {
    this.image = image;
  }
}