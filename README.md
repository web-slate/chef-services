# chef-services
Create API Consuming Code in Lightening Speed

### Below are useful commands.

#### Create React Custom hook services from exported Postman collection.
```
npx @fe-chef/services -f postman-collection.json
npx @fe-chef/services --postmanFile=postman-collection.json
```

#### Create React Custom hook services from exported Postman collection.
#### Specify the Custom Hook File location and default value is `hooks/services`

```
npx @fe-chef/services -f postman-collection.json -l hooks
npx @fe-chef/services --postmanFile=postman-collection.json --location=hooks
```

#### Create React Custom hook services from exported Postman collection.
#### Specify the Custom Hook File location and default value is `hooks/services`
#### Specify the Util File location and default value is `utils`
```
npx @fe-chef/services -f postman-collection.json -l hooks -u utilities
npx @fe-chef/services --postmanFile=postman-collection.json --location=hooks --utilLocation=utilities
```