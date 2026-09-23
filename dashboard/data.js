window.AEO_DATA = {
  "meta": {
    "site": "alexrivera.example.com",
    "subject": {
      "name": "Alexandra Rivera",
      "shortName": "Rivera",
      "company": "Washington Fine Properties",
      "site": "alexrivera.example.com"
    },
    "generatedAt": "2026-09-10",
    "dataStatus": "model",
    "datasetLabel": "Sample dashboard - fictional agent data for demonstration only",
    "engines": [
      {
        "id": "chatgpt",
        "name": "ChatGPT",
        "model": ""
      },
      {
        "id": "gemini",
        "name": "Gemini",
        "model": ""
      },
      {
        "id": "perplexity",
        "name": "Perplexity",
        "model": ""
      },
      {
        "id": "claude",
        "name": "Claude",
        "model": ""
      }
    ],
    "competitors": [
      {
        "id": "hargrove",
        "name": "The Hargrove Group"
      },
      {
        "id": "okonkwo",
        "name": "Dana Okonkwo"
      },
      {
        "id": "meridian",
        "name": "Meridian Residential"
      },
      {
        "id": "bellandco",
        "name": "Bell & Co. Real Estate"
      },
      {
        "id": "whitfield",
        "name": "Whitfield Partners"
      }
    ],
    "queries": [
      {
        "id": "q01",
        "text": "Luxury realtor in Georgetown",
        "category": "discovery"
      },
      {
        "id": "q02",
        "text": "Best real estate agent in Georgetown",
        "category": "ranking"
      },
      {
        "id": "q03",
        "text": "Best real estate agent in Kalorama",
        "category": "ranking"
      },
      {
        "id": "q04",
        "text": "Best real estate agent in Wesley Heights or Kent",
        "category": "ranking"
      },
      {
        "id": "q05",
        "text": "Best realtor in Washington DC for homes over $5 million",
        "category": "price"
      },
      {
        "id": "q06",
        "text": "Best real estate agent in Logan or Dupont",
        "category": "ranking"
      },
      {
        "id": "q07",
        "text": "Best off market realtor",
        "category": "specialty"
      },
      {
        "id": "q08",
        "text": "Best real estate agent in AU Park",
        "category": "ranking"
      },
      {
        "id": "q09",
        "text": "Washington DC luxury real estate agent rankings",
        "category": "ranking"
      },
      {
        "id": "q10",
        "text": "Best real estate agent in Chevy Chase or Chevy Chase Village",
        "category": "ranking"
      },
      {
        "id": "q11",
        "text": "Best real estate agent in Woodacres Bethesda",
        "category": "ranking"
      },
      {
        "id": "q12",
        "text": "Best real estate agent in Massachusetts Avenue Heights",
        "category": "ranking"
      },
      {
        "id": "q13",
        "text": "Best buyer's agent in Washington DC",
        "category": "buyer"
      }
    ],
    "methodologyNote": "Sample data: a fictional agent evaluated on 13 non-branded questions across answer engines using a manual, LLM-assisted capture. Metrics derived from response scoring (presence, position among tracked competitors, own-domain citations). Rank convention: rank-when-present (absent = null)."
  },
  "snapshots": [
    {
      "id": "2026-07-10",
      "label": "Jul 2026",
      "method": "manual",
      "results": [
        {
          "engine": "chatgpt",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": true,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        }
      ]
    },
    {
      "id": "2026-08-10",
      "label": "Aug 2026",
      "method": "manual",
      "results": [
        {
          "engine": "chatgpt",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": true,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        }
      ]
    },
    {
      "id": "2026-09-10",
      "label": "Sep 2026",
      "method": "manual",
      "results": [
        {
          "engine": "chatgpt",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": true,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectCited": true,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectCited": false,
          "totalCitations": 11,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 14,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 12,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 10,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 13,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q11",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q12",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 3,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 0,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q13",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectCited": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 0,
            "okonkwo": 1,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        }
      ]
    }
  ]
};
