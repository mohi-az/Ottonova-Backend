export function LandmarkFormater(landmarks: any) {

    return landmarks.map(landmark => ({
        id: landmark.id,
        name: landmark.name,
        description: landmark.description,
        imageURL: landmark.image_url,
        visitDuration: landmark.visit_duration,
        cityName: landmark.city.name,
        cityId: landmark.cityId,
        countryName: landmark.city.country,
        categories: landmark.LandmarkCategory.map(lc => ({
            id: lc.category.id,
            name: lc.category.name,
            iconName: lc.category.iconName
        }))
    }));
}