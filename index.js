const express = require('express');
const puppeteer = require('puppeteer');

// Welcome aboard the SS NomNomNavigator, sailing the digital seas in quest for scrumptious sustenance!
const app = express();

// Ahoy! The grand expedition to fetch the fabled menu data commences henceforth!
async function fetchMenuData() {
  // Hoist the sails, launch the browser! Steady as she goes, into the vast ocean of HTML!
  const browser = await puppeteer.launch({ 
    headless: 'new', 
    executablePath: '/usr/bin/google-chrome', 
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  }); // Stealth mode activated for clandestine operations!

  const page = await browser.newPage();

  // The map leading to the treasure, bestowed upon by the environmental gods!
  const restaurantURL = process.env.RESTAURANT_WEBSITE || 'https://default-restaurant-url.com';
  
  // Anchors aweigh! Set course for the Restaurant Isles!
  await page.goto(restaurantURL);

  // Behold, the lexicon of allergens! A guide for the gastronomically cautious.
  const allergenMap = {
    1: { name: 'Céréales contenant du gluten', emoji: '🌾' },
    2: { name: 'Crustacés', emoji: '🦞' },
    3: { name: 'Oeufs', emoji: '🥚' },
    4: { name: 'Poissons', emoji: '🐟' },
    5: { name: 'Arachides', emoji: '🥜' },
    6: { name: 'Soja', emoji: '🌰' },
    7: { name: 'Lait, y compris le lactose', emoji: '🥛' },
    8: { name: 'Fruits à coque dure / noix', emoji: '🌰' },
    9: { name: 'Céleri', emoji: '🌱' },
    10: { name: 'Moutarde', emoji: '🌭' },
    11: { name: 'Graines de sésame', emoji: '🌱' },
    12: { name: 'Anhydride sulfureux / sulfites', emoji: '🧪' },
    13: { name: 'Lupins', emoji: '🌱' },
    14: { name: 'Mollusques', emoji: '🐚' }
  };

  // Venturing into the belly of the beast! The DOM! Where the menu data lurks in shadows.
  const menuData = await page.evaluate((allergenMap) => {
    const menuPlanTabs = document.querySelectorAll('.menu-plan-tabs > div');
    const dateLabels = document.querySelectorAll('.day-nav .date');
    const data = [];
    const currentYear = new Date().getFullYear();  // The annals of time guide our journey!

    menuPlanTabs.forEach((tab, tabIndex) => {
      const dateSegments = dateLabels[tabIndex].textContent.trim().split('.');
      const formattedDate = `${currentYear}-${dateSegments[1]}-${dateSegments[0]}`;  // By stars and calendar, we mark the date!
      const menuItems = tab.querySelectorAll('.menu-item');
      const meals = [];

      menuItems.forEach(item => {
        const itemContent = item.querySelector('.item-content');
        const title = itemContent.querySelector('.menu-title').textContent.trim().replace(/\n/g, ' ');
        const description = itemContent.querySelector('.menu-description').textContent.trim().replace(/\n/g, ' ');

        const priceElement = itemContent.querySelector('.menu-prices .price .val');
        const price = priceElement ? parseFloat(priceElement.textContent.trim()) : '';

        const currencyElement = itemContent.querySelector('.menu-prices .price .desc');
        const currency = currencyElement ? currencyElement.textContent.trim() : '';

        const nutritionalInfoElement = itemContent.querySelector('.nutrition-table');
        const nutritionalRows = nutritionalInfoElement ? nutritionalInfoElement.querySelectorAll('tr') : [];
        const nutritionalInfo = Array.from(nutritionalRows).slice(1).map((row, rowIndex) => {
          const cells = row.querySelectorAll('td');
          return {
            name: nutritionalRows[0].querySelectorAll('th')[rowIndex].textContent.trim(),
            value: parseFloat(cells[rowIndex].textContent.trim()),
            percentage: parseFloat(nutritionalRows[2].querySelectorAll('td')[rowIndex].textContent.trim())
          };
        });

        const allergensElement = itemContent.querySelector('.allergen-info .allergen');
        const allergenIndices = allergensElement ? allergensElement.innerText.trim().match(/\d+/g) : [];
        const allergens = allergenIndices.map(index => {
          const { name, emoji } = allergenMap[index.trim()];
          return { id: index, name, emoji };
        });

        meals.push({
          title,
          description,
          price,
          currency,
          allergens,
          nutritionalInfo
        });
      });

      data.push({
        date: formattedDate,
        meals
      });
    });

    return data;  // Ah, the spoils of our brave endeavor!
  }, allergenMap);  // The allergen map, our trusty companion in the DOM dungeon.

  // Lower the drawbridge, the browser has served us well. Until the next quest!
  await browser.close();
  
  return menuData;  // The cherished treasure, ready to be served to the hungry masses!
}

// The royal path to the bounteous banquet of data!
app.get('/menu', async (req, res) => {
  try {
    const menuData = await fetchMenuData();
    res.json(menuData);  // Behold, a feast for your API! Devour it with gusto!
  } catch (err) {
    console.error('Oh crumbs! Something went wrong:', err);
    res.status(500).send('The kitchen is closed due to an orc invasion. Please try again later!');
  }
});

// The grand hall opens its gates at port 3000! Let the digital feast commence!
app.listen(3000, () => {
  console.log('Server is simmering on port 3000');
});
