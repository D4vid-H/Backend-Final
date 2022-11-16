
export const getDefault = async (req, res) => {
    try { 
        res.redirect('/login');
    } catch (error) {
      console.log(`se produjo el siguiente error: ${error}`);
      res.sendStatus(500);
    }
  };
  