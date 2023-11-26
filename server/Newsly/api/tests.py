from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from http import HTTPStatus
# Create your tests here.
class AccountsViewTest(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_sign_up(self):
        url = reverse("accounts_view")
        data = {
            "username": "kaane0169",
            "email": "kaan@@gmail.com",
            "password": "eroigeroijgiojergioj",
            "confirmpassword": "eroigeroijgiojergioj"
        }
        invalidEmailResponse = self.client.post(url, data=data, format= "json")
     
        self.assertEqual(invalidEmailResponse.status_code, HTTPStatus.INTERNAL_SERVER_ERROR)
        self.assertJSONEqual(invalidEmailResponse.content.decode("utf-8"), {"message": "Invalid email"})

        # creates temporary models, so no users actually exist, test invalid
        # data = {
        #     "username": "ree123",
        #     "password": "eroigeroijgiojergioj",
        #     "confirmpassword": "eroigeroijgiojergioj",
        #     "email": "test2@gmail.com"
        # }
        # existingUserResponse = self.client.post(url, data=data, format= "json")
        # self.assertEqual(existingUserResponse.status_code, HTTPStatus.INTERNAL_SERVER_ERROR)
        # self.assertJSONNotEqual(existingUserResponse.content.decode("utf-8"), {"message": "Username already exists or account with existing email exists"})

        data = {
            "username": "ree1234",
            "password": "@Fwoef#oerg",
            "confirmpassword": "@Fwoef#oerg",
            "email": "test30@gmail.com"
        }

        validUserCreation = self.client.post(url, data=data, format = "json")
        self.assertEqual(validUserCreation.status_code, HTTPStatus.CREATED)
    
    def test_login(self):
        url = reverse("accounts_view")

        data = {
            "username": "orjiegjoier",
            "password": "3r2#@EO@#r2"
        }

        nonExistingUserResponse = self.client.put(url, data=data, format= "json")
        self.assertEqual(nonExistingUserResponse.status_code, HTTPStatus.NOT_FOUND)
        self.assertJSONEqual(nonExistingUserResponse.content.decode("utf-8"), {'message': "Invalid username or password"})

        data = {
            "username": "ree123",
            "password": "dfinitleyIcnorrefv"
        }

        validUserButInvalidPasswordResponse = self.client.put(url, data= data, format = "json")
        self.assertEqual(validUserButInvalidPasswordResponse.status_code, HTTPStatus.NOT_FOUND)
        self.assertJSONEqual(validUserButInvalidPasswordResponse.content.decode("utf-8"), {'message': "Invalid username or password"})
        