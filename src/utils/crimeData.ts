// src/utils/crimeData.ts
export class CrimeDataService {
  static async getAreaCrimeStats(lat: number, lng: number) {
    try {
      console.log('Fetching crime data for:', lat, lng); // Debug log
      
      // More comprehensive query for safety-related amenities
      const query = `
        [out:json];
        (
          node["amenity"="police"](around:5000,${lat},${lng});
          node["amenity"="fire_station"](around:5000,${lat},${lng});
          node["amenity"="pub"](around:3000,${lat},${lng});
          node["amenity"="bar"](around:3000,${lat},${lng});
        );
        out count;
      `;
      
      const response = await fetch(
        `https://overpass-api.de/api/interpreter`,
        {
          method: 'POST',
          body: `data=${encodeURIComponent(query)}`
        }
      );
      
      const data = await response.json();
      console.log('Crime API Response:', data); // Debug log
      
      let policeCount = 0;
      let pubCount = 0;
      
      // Count different types of amenities
      data.elements?.forEach((element: any) => {
        if (element.tags?.amenity === 'police') policeCount++;
        if (element.tags?.amenity === 'pub' || element.tags?.amenity === 'bar') pubCount++;
      });
      
      // Calculate crime score based on safety factors
      let crimeScore = 50; // Base score
      
      // More police = safer
      if (policeCount >= 3) crimeScore -= 20;
      else if (policeCount >= 2) crimeScore -= 10;
      else if (policeCount >= 1) crimeScore -= 5;
      
      // More pubs/bars = potentially less safe at night
      if (pubCount >= 3) crimeScore += 15;
      else if (pubCount >= 2) crimeScore += 10;
      else if (pubCount >= 1) crimeScore += 5;
      
      crimeScore = Math.max(10, Math.min(90, crimeScore));
      
      const riskLevel = crimeScore > 70 ? 'high' : crimeScore > 40 ? 'medium' : 'low';
      
      console.log('Calculated crime stats:', { crimeScore, policeCount, riskLevel }); // Debug log
      
      return {
        crimeScore,
        policeStations: policeCount,
        riskLevel
      };
    } catch (error) {
      console.error('Crime data error:', error);
      // Return moderate risk as fallback
      return { crimeScore: 50, policeStations: 1, riskLevel: 'medium' };
    }
  }
}