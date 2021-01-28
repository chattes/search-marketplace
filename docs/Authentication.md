## Azure Authentication

Azure AD(Active Directory) is used to authenticate a App Service Plan.

* goto Azure Active Directory and create a new App Registration

(![image](https://user-images.githubusercontent.com/11190834/106182932-8d024d80-616d-11eb-8266-e572a8e92366.png)

![image](https://user-images.githubusercontent.com/11190834/106183299-0d28b300-616e-11eb-8bb7-a77f0629480b.png)



We need to put a Redirect URI to our App Service App

* Here we registered or Front Facing App `search-ads-ad`

We have to note down the 
  >   Application(client) Id

  >   Directory(tenant) Id

* Create a Client Secret and note down the secret

![image](https://user-images.githubusercontent.com/11190834/106183560-57119900-616e-11eb-868e-96bb09bf6b7f.png)

* go to the blade `Expose an API` and add a scope like so

![image](https://user-images.githubusercontent.com/11190834/106183678-86280a80-616e-11eb-894e-55c69b2ec789.png)

![image](https://user-images.githubusercontent.com/11190834/106183736-a061e880-616e-11eb-93fb-74e3a7cf7ff4.png)


That is it for Configuring the API Permissions using Azure Active Directory

In order to enable authentication follow below.

## Enable Authentication in App Service

* Go to you App Service and select Blade Authentication/Autorization
* Switch on the Authentication and Select Azure Active Directory

![image](https://user-images.githubusercontent.com/11190834/106184263-4ada0b80-616f-11eb-8adb-73aa63441bfa.png)

* Configure Authentication in Active Directory using Advanced

Put in the 
> Client Id

> Issuer URL( the Id is the Directory/Tenant Id from your Application Registered)

and the Client Secret that you had copied earlier from the 

> Client Secret &

> Allowed Token Audiences

![image](https://user-images.githubusercontent.com/11190834/106185239-8d501800-6170-11eb-9d11-f094046a8440.png)

That's it , now our App Service Webapp wont be allowed without an Access Token

### Testing(In Postman)

Calling our Endpoint without the Access Token..

![image](https://user-images.githubusercontent.com/11190834/106185443-d3a57700-6170-11eb-82e4-2d5af124e86d.png)

![image](https://user-images.githubusercontent.com/11190834/106185526-ef108200-6170-11eb-8493-fa4a0499b93d.png)


In order to get a token we will send a `POST` request to 

> https://login.microsoftonline.com/{Directory Id}/oauth2/token

The corresponding curl command

```
curl --location --request GET 'https://login.microsoftonline.com/{DirectoryId}/oauth2/token' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--header 'Cookie: buid=0.AAAA2L-tEDEzIUyHMiqcnYZBG0zCrWVEWPxIv7QldS8R4Ax2AAA.AQABAAEAAAD--DLA3VO7QrddgJg7WevrCsjBDDj2D4L3PIQzeIxEcPN4c3raoDs8Auz4vyqlDygcScU5iD9ccuE7KjPagqOgeqMyCZx3beawLcrOuuLYfimj2iyDcu3Xz0-NZf3itccgAA; fpc=Akmd4rsqH2dNiGenm1mhBG_gzCetCAAAAGLfo9cOAAAA' \
--data-urlencode 'grant_type=client_credentials' \
--data-urlencode 'client_id={ClientIdOfApplication} \
--data-urlencode 'client_secret={ClientSecretOfApp} \
--data-urlencode 'resource=https://ads-search-webapp.azurewebsites.net'
```

We get the Access Token which we will use to Call the API


![image](https://user-images.githubusercontent.com/11190834/106186402-3b0ff680-6172-11eb-999a-b50e695ec4e9.png)


We use this token (Bearer) to call the API Again

This time our API Call goes through successfully!

![image](https://user-images.githubusercontent.com/11190834/106186665-9641e900-6172-11eb-8949-86e03ff638ad.png)


## References and Useful Links

[Get Auth Token - Postman](https://docs.microsoft.com/en-us/rest/api/servicebus/get-azure-active-directory-token)

[Active Dir](https://docs.microsoft.com/en-us/azure/active-directory/fundamentals/active-directory-whatis#:~:text=Azure%20Active%20Directory%20Azure%20AD,in%20and%20access%20resources%20in%3A&text=Internal%20resources%2C%20such%20as%20apps,developed%20by%20your%20own%20organization.)

[Different Azure Acces control](https://www.youtube.com/watch?v=E6S1yJKTB7c&feature=youtu.be)