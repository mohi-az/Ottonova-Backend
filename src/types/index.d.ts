interface Category {
    id: number;
    name: string;
    iconName: string | null;
  }
  
  interface Landmark {
    id: number;
    name: string;
    description: string | null;
    imageURL: string;
    visitDuration: number;
    cityName: string;
    cityId: number;
    countryName: string;
    categories: Category[];
  }
  
  type Landmarks = Landmark[];