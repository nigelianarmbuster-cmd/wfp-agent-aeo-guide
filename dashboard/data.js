window.AEO_DATA = {
  "meta": {
    "site": "alexrivera.example.com",
    "subject": {
      "name": "Alexandra \"Alex\" Rivera",
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
        "text": "Who is Alexandra Rivera?",
        "category": "profile"
      },
      {
        "id": "q02",
        "text": "Best real estate agent in Georgetown DC",
        "category": "ranking"
      },
      {
        "id": "q03",
        "text": "Top luxury real estate agents in Washington DC",
        "category": "ranking"
      },
      {
        "id": "q04",
        "text": "Alexandra Rivera vs Dana Okonkwo",
        "category": "comparison"
      },
      {
        "id": "q05",
        "text": "Top real estate agents in Northwest Washington DC",
        "category": "ranking"
      },
      {
        "id": "q06",
        "text": "Alexandra Rivera real estate reviews",
        "category": "reputation"
      },
      {
        "id": "q07",
        "text": "Best real estate agent in DC for luxury homes",
        "category": "ranking"
      },
      {
        "id": "q08",
        "text": "Who is the top selling agent in Georgetown?",
        "category": "ranking"
      },
      {
        "id": "q09",
        "text": "Washington DC luxury real estate agent rankings",
        "category": "ranking"
      },
      {
        "id": "q10",
        "text": "Alexandra Rivera Washington Fine Properties profile",
        "category": "profile"
      }
    ],
    "methodologyNote": "Sample data: a fictional agent evaluated on 10 agent-focused questions across answer engines using a manual, LLM-assisted capture. Metrics derived from response scoring (presence, position among tracked competitors, citations, explicit recommendation). Rank convention: rank-when-present (absent = null)."
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
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 3,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 6,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
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
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 4,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 6,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 1,
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
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
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
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 3,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 7,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 4,
          "competitorMentions": {
            "hargrove": 1,
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
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
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
          "subjectRank": 3,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 1,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 5,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
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
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q08",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "chatgpt",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 1,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "gemini",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "gemini",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 1,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q06",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 1,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q08",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 1
          }
        },
        {
          "engine": "perplexity",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q01",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q02",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q03",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 8,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q04",
          "subjectPresent": true,
          "subjectRank": 1,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 3,
            "meridian": 0,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q05",
          "subjectPresent": true,
          "subjectRank": 4,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 2,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q06",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 5,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 0,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q07",
          "subjectPresent": true,
          "subjectRank": 3,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 1,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q08",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 7,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 1,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 0
          }
        },
        {
          "engine": "claude",
          "queryId": "q09",
          "subjectPresent": false,
          "subjectRank": null,
          "subjectRecommended": false,
          "totalCitations": 9,
          "competitorMentions": {
            "hargrove": 3,
            "okonkwo": 2,
            "meridian": 3,
            "bellandco": 0,
            "whitfield": 1
          }
        },
        {
          "engine": "claude",
          "queryId": "q10",
          "subjectPresent": true,
          "subjectRank": 2,
          "subjectRecommended": true,
          "totalCitations": 6,
          "competitorMentions": {
            "hargrove": 2,
            "okonkwo": 1,
            "meridian": 2,
            "bellandco": 0,
            "whitfield": 0
          }
        }
      ]
    }
  ]
};
