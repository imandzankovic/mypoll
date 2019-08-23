// Copyright 2017 Google Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const google = require('googleapis');
const fs = require('fs');
const read = require('read-file');
const BigQuery = require('@google-cloud/bigquery');
const bigquery = BigQuery({
  credentials: require('../upload/file')
});



// See codelab for other queries.
const query = `
WITH AllLicenses AS (
  SELECT * FROM \`bigquery-public-data.github_repos.licenses\`
)
SELECT
  license,
  COUNT(*) AS count,
  ROUND((COUNT(*) / (SELECT COUNT(*) FROM AllLicenses)) * 100, 2) AS percent
FROM \`bigquery-public-data.github_repos.licenses\`
GROUP BY license
ORDER BY count DESC
LIMIT 10
`;

/**
 * Get the license data from BigQuery and our license data.
 * @return {Promise} A promise to return an object of licenses keyed by name.
 */
module.exports.getLicenseData = (auth) => {
  console.log('querying BigQuery...');
  return bigquery.query({
    query,
    useLegacySql: false,
    useQueryCache: true,
  })
   .then(bqData => Promise.all(bqData[0].map(getLicenseText)))
    .then(licenseData => new Promise((resolve, reject) => {
      resolve([auth, licenseData]);
    }))
    .catch((err) => console.error('BigQuery error:', err));
}

/**
 * Gets a promise to get the license text about a license
 * @param {object} licenseDatum An object with the license's
 *   `license`, `count`, and `percent`
 * @return {Promise} A promise to return license data with license text.
 */
function getLicenseText(licenseDatum) {
  const licenseName = licenseDatum.license;
  return new Promise((resolve, reject) => {
    read(`licenses/${licenseName}.txt`, 'utf8', (err, buffer) => {
      if (err) return reject(err);
      resolve({
        licenseName,
        count: licenseDatum.count,
        percent: licenseDatum.percent,
        license: buffer.substring(0, 1200) // first 1200 characters
      });
    });
  });
}
