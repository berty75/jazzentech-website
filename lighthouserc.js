module.exports = {
    ci: {
      collect: {
        url: [
          'http://localhost:3000',
          'http://localhost:3000/programmation',
          'http://localhost:3000/contact', 
          'http://localhost:3000/benevoles',
          'http://localhost:3000/billetterie',
          'http://localhost:3000/mot-du-president',
          'http://localhost:3000/artistes/manu-le-prince', // Page artiste existante
          'http://localhost:3000/dossier-presse'
        ],
        startServerCommand: 'npm run start',
        numberOfRuns: 3
      },
      assert: {
        assertions: {
          'categories:performance': ['warn', { minScore: 0.8 }],
          'categories:accessibility': ['error', { minScore: 0.9 }],
          'categories:best-practices': ['warn', { minScore: 0.8 }],
          'categories:seo': ['warn', { minScore: 0.8 }]
        }
      },
      upload: {
        target: 'temporary-public-storage'
      }
    }
  }