export class Product {
//All the properties name should matches actual JSON data that pass back from Spring Boot Service under entity/HMYService
  constructor(public name: string,
              public description: string,
              public imageUrl: string,
              public active: boolean,
              public dateCreated: Date,
              public lastUpdated: Date,
    ) {
      }
}

