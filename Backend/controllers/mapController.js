export const getMapData = async (req, res) => {
    const { cardId } = req.params;  // Destructuring to extract cardId from the URL params
  
    try {
      // Fetch map data based on the cardId
      const mapData = await database.findMapDataByCardId(cardId);
  
      if (mapData) {
        // Send the map data as JSON if found
        res.json(mapData);
      } else {
        // If no data found, send a 404 error
        res.status(404).json({ message: 'Map data not found' });
      }
    } catch (error) {
      // Catch and log any errors
      console.error('Error retrieving map data:', error);
      res.status(500).json({ message: 'Internal server error' });  // Return server error response
    }
  };