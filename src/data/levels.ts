import { CaseLevel } from '../types';

export const CASE_LEVELS: CaseLevel[] = [
  // ==========================================
  // LEVEL 0: ORIENTATION (Single Table Basics)
  // ==========================================
  {
    id: 0,
    levelNumber: 0,
    title: 'Precinct 42: Orientation',
    subtitle: "Locating Officer Montoya's Missing Badge & Relational Basics",
    category: 'Orientation',
    difficulty: 'Beginner',
    briefing: {
      incidentDate: 'Oct 14, 2042 · 01:15 AM',
      location: 'Precinct 42 Cyber Forensics Bay',
      dossier: "Welcome to the division, Detective. Before dispatching to field felonies, Officer Montoya mislaid his gold security badge in the precinct inventory vault. Let's orient ourselves to the relational database terminal, inspect table records, and master basic column projection.",
      suspectTarget: "Officer Montoya's misplaced badge #402"
    },
    tables: [
      {
        name: 'evidence_registry',
        description: 'Precinct equipment and evidence lockers catalog.',
        columns: [
          { name: 'item_id', type: 'INTEGER', isPrimaryKey: true, description: 'Unique property tracking ID (Primary Key)' },
          { name: 'item_name', type: 'TEXT', description: 'Item name / description' },
          { name: 'custodian', type: 'TEXT', description: 'Assigned officer or custodian' },
          { name: 'location', type: 'TEXT', description: 'Precinct locker or desk location' },
          { name: 'status', type: 'TEXT', description: 'Secured, Checked Out, or Misplaced' }
        ],
        rows: [
          { item_id: 1, item_name: 'Encrypted Comms Unit', custodian: 'Det. Reynolds', location: 'Locker 14', status: 'Secured' },
          { item_id: 2, item_name: "Montoya's Gold Badge #402", custodian: 'Officer Montoya', location: 'Desk Drawer B', status: 'Misplaced' },
          { item_id: 3, item_name: 'Quantum Data Drive', custodian: 'Agent Hayes', location: 'Vault A', status: 'Secured' },
          { item_id: 4, item_name: 'Forensic Scanner Kit', custodian: 'Officer Montoya', location: 'Lab Bench 3', status: 'Active' },
          { item_id: 5, item_name: 'Patrol Drone Telemetry Unit', custodian: 'Officer Miller', location: 'Charging Dock', status: 'Standby' }
        ]
      }
    ],
    tasks: [
      {
        id: 'L0_T1',
        title: 'Task 1: Full Registry Diagnostic',
        instruction: 'Inspect the entire `evidence_registry`. Retrieve all columns and all rows using the SQL wildcard selector (*).',
        conceptFocus: 'SELECT * FROM table',
        hint: 'Use the asterisk (*) symbol to select all columns: SELECT * FROM evidence_registry;',
        hintCost: 20,
        sampleSolution: 'SELECT * FROM evidence_registry;',
        points: 100,
        validateResult: (rows, columns) => {
          if (rows.length === 5 && (columns.length >= 4 || columns.includes('item_name'))) {
            return {
              isCorrect: true,
              feedback: 'Database connection established! 5 inventory records successfully dumped to your detective console.',
              clueDiscovered: 'Terminal decrypted: Precinct inventory online.'
            };
          }
          if (rows.length === 0) {
            return { isCorrect: false, feedback: 'No rows returned. Did you query `SELECT * FROM evidence_registry;`?' };
          }
          return {
            isCorrect: false,
            feedback: 'Make sure to select all columns using * from the evidence_registry table.'
          };
        }
      },
      {
        id: 'L0_T2',
        title: 'Task 2: Equipment Item & Location Isolation',
        instruction: 'The quartermaster only needs the item names and their storage locations. Write a query that projects ONLY `item_name` and `location` from `evidence_registry`.',
        conceptFocus: 'Column Projection (SELECT col1, col2)',
        hint: 'Separate column names with commas: SELECT item_name, location FROM evidence_registry;',
        hintCost: 25,
        sampleSolution: 'SELECT item_name, location FROM evidence_registry;',
        points: 120,
        validateResult: (rows, columns) => {
          const lowerCols = columns.map(c => c.toLowerCase());
          const hasItem = lowerCols.includes('item_name');
          const hasLocation = lowerCols.includes('location');
          
          if (rows.length === 5 && hasItem && hasLocation && columns.length === 2) {
            return {
              isCorrect: true,
              feedback: "Clean output! Filtering out unnecessary metadata shows Montoya's Gold Badge #402 is located in Desk Drawer B.",
              clueDiscovered: "Officer Montoya's missing badge located in Desk Drawer B!"
            };
          }
          if (columns.length > 2) {
            return { isCorrect: false, feedback: 'You returned too many columns. We only want `item_name` and `location`.' };
          }
          return { isCorrect: false, feedback: 'Verify your column names: SELECT item_name, location FROM evidence_registry;' };
        }
      },
      {
        id: 'L0_T3',
        title: "Task 3: Locate Montoya's Custody Items",
        instruction: 'Retrieve `item_name`, `custodian`, and `status` for all inventory items to confirm Officer Montoya’s gear status before heading to the field.',
        conceptFocus: 'Multi-column Selection',
        hint: 'Specify the three target columns separated by commas: SELECT item_name, custodian, status FROM evidence_registry;',
        hintCost: 25,
        sampleSolution: 'SELECT item_name, custodian, status FROM evidence_registry;',
        points: 120,
        validateResult: (rows, columns) => {
          const lowerCols = columns.map(c => c.toLowerCase());
          const okCols = lowerCols.includes('item_name') && lowerCols.includes('custodian') && lowerCols.includes('status');
          if (rows.length === 5 && okCols && columns.length === 3) {
            return {
              isCorrect: true,
              feedback: "Montoya's badge has been recovered, and your relational orientation is complete! Ready for Case File #001.",
              clueDiscovered: 'Orientation cleared: Montoya badge verified and field clearance granted.'
            };
          }
          return { isCorrect: false, feedback: 'Query must return exactly `item_name`, `custodian`, and `status`.' };
        }
      }
    ],
    journalUnlockId: 'tables_and_columns'
  },

  // ==========================================
  // LEVEL 1: FILTERING (WHERE, AND/OR, LIKE)
  // ==========================================
  {
    id: 1,
    levelNumber: 1,
    title: 'Case File #001: Filtering the Lineup',
    subtitle: 'The 5th Avenue Warehouse Break-in',
    category: 'Filtering',
    difficulty: 'Apprentice',
    briefing: {
      incidentDate: 'Oct 14, 2042 · 02:40 AM',
      location: '5th Avenue Warehouse District',
      dossier: "Good work finding Officer Montoya’s missing badge in orientation, Detective. Now we have our first real lead.\n\nA warehouse on 5th Avenue was broken into last night. An eyewitness saw a suspect fleeing the scene in a dark jacket, but they only caught a partial glance. We’ve pulled records on all known suspects in the district into the suspects table. Your job is to narrow down the lineup using specific search criteria until we find our primary suspect.",
      suspectTarget: 'Warehouse burglar fleeing in a dark jacket'
    },
    tables: [
      {
        name: 'suspects',
        description: 'Records of known suspects in the 5th Avenue precinct district.',
        columns: [
          { name: 'suspect_id', type: 'INTEGER', isPrimaryKey: true, description: 'Unique suspect ID (Primary Key)' },
          { name: 'full_name', type: 'TEXT', description: 'Legal name of suspect' },
          { name: 'alias', type: 'TEXT', description: 'Underworld street moniker' },
          { name: 'jacket_color', type: 'TEXT', description: 'Color of jacket observed' },
          { name: 'height_inches', type: 'INTEGER', description: 'Height recorded in inches' },
          { name: 'last_known_location', type: 'TEXT', description: 'District or avenue where last spotted' },
          { name: 'has_priors', type: 'BOOLEAN', description: 'Prior criminal record flag (1 = True, 0 = False)' }
        ],
        rows: [
          { suspect_id: 101, full_name: 'Arthur Pendelton', alias: 'Artie', jacket_color: 'Black', height_inches: 70, last_known_location: '5th Avenue', has_priors: 0 },
          { suspect_id: 102, full_name: 'Elena Rostova', alias: 'The Ghost', jacket_color: 'Black', height_inches: 65, last_known_location: '5th Avenue', has_priors: 1 },
          { suspect_id: 103, full_name: 'Marcus Vance', alias: 'Sledge', jacket_color: 'Brown', height_inches: 72, last_known_location: 'Docks', has_priors: 1 },
          { suspect_id: 104, full_name: 'Clara Higgins', alias: 'Slick', jacket_color: 'Green', height_inches: 62, last_known_location: 'Uptown', has_priors: 0 },
          { suspect_id: 105, full_name: 'Damon Thorne', alias: 'Shadow', jacket_color: 'Black', height_inches: 68, last_known_location: '5th Avenue', has_priors: 1 },
          { suspect_id: 106, full_name: 'Frankie Mercer', alias: 'Two-Times', jacket_color: 'Red', height_inches: 71, last_known_location: '5th Avenue', has_priors: 0 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L1_M1',
        title: 'Mission 1: The Dark Jacket Lead',
        instruction: "Find all suspects who were wearing a `'Black'` jacket. Project `full_name`, `alias`, and `jacket_color` (or all columns) using a `WHERE` clause.",
        conceptFocus: "Basic string equality with WHERE (jacket_color = 'Black')",
        hint: "Strings in SQL must be enclosed in single quotes: SELECT full_name, alias, jacket_color FROM suspects WHERE jacket_color = 'Black';",
        hintCost: 20,
        sampleSolution: "SELECT full_name, alias, jacket_color FROM suspects WHERE jacket_color = 'Black';",
        points: 120,
        validateResult: (rows) => {
          if (rows.length === 3 && rows.every(r => r.jacket_color === 'Black')) {
            const names = rows.map(r => r.full_name);
            if (names.includes('Arthur Pendelton') && names.includes('Elena Rostova') && names.includes('Damon Thorne')) {
              return {
                isCorrect: true,
                feedback: 'Lead verified! 3 suspects were seen wearing a Black jacket: Arthur Pendelton, Elena Rostova, and Damon Thorne.',
                clueDiscovered: '3 suspects matched the Black jacket description: Arthur, Elena, and Damon.'
              };
            }
          }
          return { isCorrect: false, feedback: "Ensure you filter for suspects with a Black jacket: WHERE jacket_color = 'Black'" };
        }
      },
      {
        id: 'L1_M2',
        title: 'Mission 2: Narrowing the Location & Criminal History',
        instruction: "The witness confirmed the suspect was seen near `'5th Avenue'` AND has a prior criminal record (`has_priors = 1`). Filter for suspects matching both conditions.",
        conceptFocus: 'Compound WHERE with AND (has_priors = 1)',
        hint: "Combine both conditions with AND: SELECT full_name, alias, last_known_location, has_priors FROM suspects WHERE last_known_location = '5th Avenue' AND has_priors = 1;",
        hintCost: 25,
        sampleSolution: "SELECT full_name, alias, last_known_location, has_priors FROM suspects WHERE last_known_location = '5th Avenue' AND has_priors = 1;",
        points: 140,
        validateResult: (rows) => {
          if (rows.length === 2 && rows.every(r => r.last_known_location === '5th Avenue' && (r.has_priors === 1 || r.has_priors === true))) {
            return {
              isCorrect: true,
              feedback: "Lineup narrowed! Only Elena Rostova ('The Ghost') and Damon Thorne ('Shadow') were at 5th Avenue with prior criminal records.",
              clueDiscovered: 'Lineup reduced to 2 suspects with priors at 5th Avenue: Elena Rostova and Damon Thorne.'
            };
          }
          return { isCorrect: false, feedback: "Filter matching both conditions: WHERE last_known_location = '5th Avenue' AND has_priors = 1" };
        }
      },
      {
        id: 'L1_M3',
        title: 'Mission 3: Matching Physical Descriptions',
        instruction: "The witness noted the suspect was taller than 66 inches (`height_inches > 66`) OR went by an alias starting with 'The' or containing 'Shadow'. Find suspects taller than 66 inches who were at 5th Avenue with priors (or query by alias pattern).",
        conceptFocus: 'Comparison (> 66) & LIKE %Shadow%',
        hint: "Option A: SELECT full_name, alias, height_inches FROM suspects WHERE last_known_location = '5th Avenue' AND has_priors = 1 AND height_inches > 66;\nOption B: SELECT full_name, alias FROM suspects WHERE alias LIKE '%Shadow%';",
        hintCost: 30,
        sampleSolution: "SELECT full_name, alias, height_inches FROM suspects WHERE last_known_location = '5th Avenue' AND has_priors = 1 AND height_inches > 66;",
        points: 160,
        validateResult: (rows) => {
          const hasDamon = rows.some(r => r.full_name === 'Damon Thorne' || r.alias === 'Shadow');
          const hasElena = rows.some(r => r.full_name === 'Elena Rostova');
          if (hasDamon && !hasElena && (rows.length === 1 || rows.every(r => r.full_name === 'Damon Thorne'))) {
            return {
              isCorrect: true,
              feedback: "PRIMARY SUSPECT IDENTIFIED! Damon Thorne ('Shadow'), height 68 inches, fits the witness description and criminal record profile.",
              clueDiscovered: "Primary Suspect Unmasked: Damon Thorne ('Shadow') - Height: 68\", Jacket: Black, Location: 5th Avenue."
            };
          }
          return {
            isCorrect: false,
            feedback: "Narrow down to the single suspect taller than 66 inches at 5th Avenue with priors, or use: WHERE alias LIKE '%Shadow%'"
          };
        }
      }
    ],
    journalUnlockId: 'filtering_clauses'
  },

  // ==========================================
  // LEVEL 2: RELATIONAL JOINS (Keys & INNER JOIN)
  // ==========================================
  {
    id: 2,
    levelNumber: 2,
    title: 'Case File #002: The Midnight Heist at the Sterling Gallery',
    subtitle: 'Connecting the Relational Keys to Unmask the Vault Breaker',
    category: 'Joins',
    difficulty: 'Investigator',
    briefing: {
      incidentDate: 'Sep 02, 2026 · 11:42 PM',
      location: 'Sterling Gallery, Vault Rear Exit',
      dossier: "Good work tracking down Damon Thorne in Case 001. However, interrogation revealed Thorne was just a getaway driver—the main mastermind behind the heist remains unknown.\n\nAt 11:42 PM last night, a priceless diamond was stolen from the gallery's vault. The thief bypassed security by using a cloned access badge at the rear exit. You now have access to multi-table records: suspect personal files, issued badges, and automated security door logs. You must link these tables using keys to unmask the vault breaker.",
      suspectTarget: 'Unknown vault breaker behind cloned access badge'
    },
    tables: [
      {
        name: 'suspects',
        description: 'Suspect records and criminal priors files.',
        columns: [
          { name: 'suspect_id', type: 'INTEGER', isPrimaryKey: true, description: 'Unique suspect ID (Primary Key)' },
          { name: 'full_name', type: 'TEXT', description: 'Legal name of suspect' },
          { name: 'alias', type: 'TEXT', description: 'Underworld street moniker' },
          { name: 'has_priors', type: 'BOOLEAN', description: 'Criminal priors flag (1 = True, 0 = False)' }
        ],
        rows: [
          { suspect_id: 101, full_name: 'Arthur Pendelton', alias: 'Artie', has_priors: 0 },
          { suspect_id: 102, full_name: 'Elena Rostova', alias: 'The Ghost', has_priors: 1 },
          { suspect_id: 103, full_name: 'Marcus Vance', alias: 'Sledge', has_priors: 1 },
          { suspect_id: 104, full_name: 'Clara Higgins', alias: 'Slick', has_priors: 0 }
        ]
      },
      {
        name: 'badge_registry',
        description: 'Badge registry linking suspects to physical electronic badge IDs.',
        columns: [
          { name: 'badge_id', type: 'INTEGER', isPrimaryKey: true, description: 'Physical badge ID (Primary Key)' },
          { name: 'suspect_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'suspects(suspect_id)', description: 'Badge holder (Foreign Key -> suspects)' },
          { name: 'issue_date', type: 'TEXT', description: 'Date badge was issued' }
        ],
        rows: [
          { badge_id: 5001, suspect_id: 101, issue_date: '2025-01-15' },
          { badge_id: 5002, suspect_id: 102, issue_date: '2025-03-22' },
          { badge_id: 5003, suspect_id: 103, issue_date: '2025-06-10' },
          { badge_id: 5004, suspect_id: 104, issue_date: '2025-09-01' }
        ]
      },
      {
        name: 'door_logs',
        description: 'Automated physical door scanner access logs.',
        columns: [
          { name: 'log_id', type: 'INTEGER', isPrimaryKey: true, description: 'Unique scanner log ID (Primary Key)' },
          { name: 'badge_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'badge_registry(badge_id)', description: 'Scanned badge (Foreign Key -> badge_registry)' },
          { name: 'door_location', type: 'TEXT', description: 'Sensor checkpoint location' },
          { name: 'access_time', type: 'DATETIME', description: 'Timestamp of door scan' }
        ],
        rows: [
          { log_id: 1, badge_id: 5001, door_location: 'Main Entrance', access_time: '2026-09-02 22:15:00' },
          { log_id: 2, badge_id: 5004, door_location: 'Main Entrance', access_time: '2026-09-02 23:00:00' },
          { log_id: 3, badge_id: 5002, door_location: 'Vault Rear Exit', access_time: '2026-09-02 23:41:00' },
          { log_id: 4, badge_id: 5003, door_location: 'Main Entrance', access_time: '2026-09-02 23:50:00' },
          { log_id: 5, badge_id: 5004, door_location: 'Vault Rear Exit', access_time: '2026-09-02 23:58:00' }
        ]
      }
    ],
    tasks: [
      {
        id: 'L2_M1',
        title: 'Mission 1: Identify the Suspicious Badge',
        instruction: "Find the badge_id that scanned through the `'Vault Rear Exit'` between 23:30:00 and 23:45:00. Query `badge_id`, `door_location`, and `access_time` from `door_logs`.",
        conceptFocus: 'Time-range filtering (BETWEEN)',
        hint: "SELECT badge_id, door_location, access_time FROM door_logs WHERE door_location = 'Vault Rear Exit' AND access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00';",
        hintCost: 25,
        sampleSolution: "SELECT badge_id, door_location, access_time FROM door_logs WHERE door_location = 'Vault Rear Exit' AND access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00';",
        points: 140,
        validateResult: (rows) => {
          if (rows.length === 1 && (rows[0].badge_id === 5002 || rows[0].badge_id === '5002')) {
            return {
              isCorrect: true,
              feedback: 'Suspicious badge isolated! Badge #5002 scanned the Vault Rear Exit at 23:41:00 during the critical heist window.',
              clueDiscovered: 'Suspicious badge identified: Badge #5002 logged at Vault Rear Exit (23:41:00).'
            };
          }
          return { isCorrect: false, feedback: "Filter door_logs where door_location = 'Vault Rear Exit' and access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00'." };
        }
      },
      {
        id: 'L2_M2',
        title: 'Mission 2: Link Badge ID to Suspect ID (2-Table JOIN)',
        instruction: "Perform an `INNER JOIN` between `door_logs` and `badge_registry` on `badge_id` to discover which `suspect_id` owns badge 5002.",
        conceptFocus: 'INNER JOIN on Foreign Key = Primary Key',
        hint: "SELECT door_logs.access_time, door_logs.door_location, badge_registry.suspect_id FROM door_logs INNER JOIN badge_registry ON door_logs.badge_id = badge_registry.badge_id WHERE door_logs.badge_id = 5002;",
        hintCost: 30,
        sampleSolution: "SELECT door_logs.access_time, door_logs.door_location, badge_registry.suspect_id FROM door_logs INNER JOIN badge_registry ON door_logs.badge_id = badge_registry.badge_id WHERE door_logs.badge_id = 5002;",
        points: 160,
        validateResult: (rows) => {
          const hasSuspect102 = rows.some(r => r.suspect_id === 102 || r.suspect_id === '102');
          if (hasSuspect102) {
            return {
              isCorrect: true,
              feedback: 'Relational link established! Badge #5002 belongs to Suspect #102 in the registry.',
              clueDiscovered: 'Badge #5002 linked to Suspect ID #102.'
            };
          }
          return { isCorrect: false, feedback: 'Join door_logs with badge_registry ON door_logs.badge_id = badge_registry.badge_id and filter for badge_id = 5002.' };
        }
      },
      {
        id: 'L2_M3',
        title: 'Mission 3: Unmask the Vault Breaker (3-Table JOIN)',
        instruction: "Join all three tables (`door_logs`, `badge_registry`, and `suspects`) to pull the `full_name`, `alias`, `has_priors`, `door_location`, and `access_time` of the person who opened the rear exit during the heist.",
        conceptFocus: 'Chaining multiple INNER JOINs (3 Tables)',
        hint: "SELECT s.full_name, s.alias, s.has_priors, d.door_location, d.access_time FROM door_logs d INNER JOIN badge_registry b ON d.badge_id = b.badge_id INNER JOIN suspects s ON b.suspect_id = s.suspect_id WHERE d.door_location = 'Vault Rear Exit' AND d.access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00';",
        hintCost: 35,
        sampleSolution: "SELECT s.full_name, s.alias, s.has_priors, d.door_location, d.access_time FROM door_logs d INNER JOIN badge_registry b ON d.badge_id = b.badge_id INNER JOIN suspects s ON b.suspect_id = s.suspect_id WHERE d.door_location = 'Vault Rear Exit' AND d.access_time BETWEEN '2026-09-02 23:30:00' AND '2026-09-02 23:45:00';",
        points: 200,
        validateResult: (rows) => {
          if (rows.length === 1 && (rows[0].full_name === 'Elena Rostova' || rows[0].alias === 'The Ghost')) {
            return {
              isCorrect: true,
              feedback: "PRIMARY SUSPECT UNMASKED! Elena Rostova ('The Ghost'), who has prior convictions, scanned through the Vault Rear Exit at 23:41:00 with her cloned access badge.",
              clueDiscovered: "Vault Breaker Unmasked: Elena Rostova ('The Ghost') - Badge #5002, Priors: 1."
            };
          }
          return { isCorrect: false, feedback: "Chain door_logs d -> badge_registry b ON d.badge_id = b.badge_id -> suspects s ON b.suspect_id = s.suspect_id, filtering for Vault Rear Exit between 23:30:00 and 23:45:00." };
        }
      }
    ],
    journalUnlockId: 'inner_joins'
  },

  // ==========================================
  // LEVEL 3: AGGREGATION (GROUP BY, COUNT, SUM, HAVING)
  // ==========================================
  {
    id: 3,
    levelNumber: 3,
    title: "Case File #003: The Syndicate's Financial Audit",
    subtitle: 'Auditing Shell Companies & Flagging Money-Laundering Hubs',
    category: 'Aggregation',
    difficulty: 'Master Sleuth',
    briefing: {
      incidentDate: 'Sep 03, 2026 · 09:00 AM',
      location: 'International Financial District & Harbor Port',
      dossier: "Outstanding work unmasking Elena Rostova in Case 002. Under pressure, Rostova revealed that she was hired by a shadowy criminal syndicate operating across multiple shell companies.\n\nTo dismantle the syndicate's network, Chief Inspector Vance has ordered a financial audit on their laundering accounts. You have been granted access to the syndicate's central ledger (transactions) and shell companies directory (shell_companies). Your mission is to analyze high-volume money flows, flag suspicious account totals, and pinpoint the primary money-laundering hub.",
      suspectTarget: 'Primary syndicate shell company laundering hub'
    },
    tables: [
      {
        name: 'shell_companies',
        description: 'Shell companies registered under syndicate control.',
        columns: [
          { name: 'company_id', type: 'INTEGER', isPrimaryKey: true, description: 'Shell company ID (Primary Key)' },
          { name: 'company_name', type: 'TEXT', description: 'Registered business name' },
          { name: 'registration_city', type: 'TEXT', description: 'Municipal registration city' }
        ],
        rows: [
          { company_id: 201, company_name: 'Apex Logistics', registration_city: 'Neo Bay' },
          { company_id: 202, company_name: 'Vanguard Imports', registration_city: 'Port Crest' },
          { company_id: 203, company_name: 'Aegis Security', registration_city: 'Neo Bay' },
          { company_id: 204, company_name: 'Titan Holdings', registration_city: 'Iron River' }
        ]
      },
      {
        name: 'transactions',
        description: 'Financial ledger recording syndicate money transfers and deposits.',
        columns: [
          { name: 'transaction_id', type: 'INTEGER', isPrimaryKey: true, description: 'Ledger transaction reference (Primary Key)' },
          { name: 'company_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'shell_companies(company_id)', description: 'Target company (Foreign Key -> shell_companies)' },
          { name: 'amount', type: 'REAL', description: 'Transaction amount in USD' },
          { name: 'transaction_type', type: 'TEXT', description: 'Deposit or Transfer' },
          { name: 'transaction_date', type: 'TEXT', description: 'Transaction date' }
        ],
        rows: [
          { transaction_id: 1, company_id: 201, amount: 45000.00, transaction_type: 'Deposit', transaction_date: '2026-08-01' },
          { transaction_id: 2, company_id: 201, amount: 12000.00, transaction_type: 'Deposit', transaction_date: '2026-08-03' },
          { transaction_id: 3, company_id: 202, amount: 150000.00, transaction_type: 'Transfer', transaction_date: '2026-08-05' },
          { transaction_id: 4, company_id: 202, amount: 220000.00, transaction_type: 'Transfer', transaction_date: '2026-08-10' },
          { transaction_id: 5, company_id: 203, amount: 8500.00, transaction_type: 'Deposit', transaction_date: '2026-08-12' },
          { transaction_id: 6, company_id: 201, amount: 35000.00, transaction_type: 'Deposit', transaction_date: '2026-08-15' },
          { transaction_id: 7, company_id: 204, amount: 50000.00, transaction_type: 'Transfer', transaction_date: '2026-08-18' },
          { transaction_id: 8, company_id: 202, amount: 180000.00, transaction_type: 'Transfer', transaction_date: '2026-08-22' },
          { transaction_id: 9, company_id: 203, amount: 9200.00, transaction_type: 'Deposit', transaction_date: '2026-08-25' }
        ]
      }
    ],
    tasks: [
      {
        id: 'L3_M1',
        title: 'Mission 1: Count Transaction Volume by Company',
        instruction: 'Find how many total transactions were processed for each `company_id`. Select `company_id` and `COUNT(transaction_id) AS total_transactions` grouped by `company_id`.',
        conceptFocus: 'Aggregate COUNT() with GROUP BY',
        hint: 'SELECT company_id, COUNT(transaction_id) AS total_transactions FROM transactions GROUP BY company_id;',
        hintCost: 25,
        sampleSolution: 'SELECT company_id, COUNT(transaction_id) AS total_transactions FROM transactions GROUP BY company_id;',
        points: 150,
        validateResult: (rows) => {
          if (rows.length === 4) {
            const r201 = rows.find(r => r.company_id === 201 || r.company_id === '201');
            const r202 = rows.find(r => r.company_id === 202 || r.company_id === '202');
            const r203 = rows.find(r => r.company_id === 203 || r.company_id === '203');
            const r204 = rows.find(r => r.company_id === 204 || r.company_id === '204');
            if (r201 && r202 && r203 && r204) {
              const vals201 = Object.values(r201);
              const vals202 = Object.values(r202);
              const vals203 = Object.values(r203);
              const vals204 = Object.values(r204);
              if (vals201.some(v => Number(v) === 3) && vals202.some(v => Number(v) === 3) && vals203.some(v => Number(v) === 2) && vals204.some(v => Number(v) === 1)) {
                return {
                  isCorrect: true,
                  feedback: 'Transaction volume calculated! 201 (3 txns), 202 (3 txns), 203 (2 txns), and 204 (1 txn) accounted for.',
                  clueDiscovered: '4 shell companies actively processing wire transfers and deposits.'
                };
              }
            }
          }
          return { isCorrect: false, feedback: 'Execute: SELECT company_id, COUNT(transaction_id) AS total_transactions FROM transactions GROUP BY company_id;' };
        }
      },
      {
        id: 'L3_M2',
        title: 'Mission 2: Calculate Total Funds Transferred per Company',
        instruction: 'Sum the total transaction amount for each company to see where the heaviest cash flow is moving. Use `SUM(amount) AS total_laundered_amount` grouped by `company_id`.',
        conceptFocus: 'Aggregate SUM() and Column Aliasing (AS)',
        hint: 'SELECT company_id, SUM(amount) AS total_laundered_amount FROM transactions GROUP BY company_id;',
        hintCost: 30,
        sampleSolution: 'SELECT company_id, SUM(amount) AS total_laundered_amount FROM transactions GROUP BY company_id;',
        points: 180,
        validateResult: (rows) => {
          if (rows.length === 4) {
            const r202 = rows.find(r => r.company_id === 202 || r.company_id === '202');
            const r201 = rows.find(r => r.company_id === 201 || r.company_id === '201');
            if (r202 && r201) {
              const vals202 = Object.values(r202);
              const vals201 = Object.values(r201);
              if (vals202.some(v => Number(v) === 550000) && vals201.some(v => Number(v) === 92000)) {
                return {
                  isCorrect: true,
                  feedback: 'Financial audit verified! Company #202 (Vanguard Imports) has moved a staggering $550,000.00 in illicit funds, far eclipsing other accounts.',
                  clueDiscovered: 'Company #202 identified with highest gross volume ($550,000.00).'
                };
              }
            }
          }
          return { isCorrect: false, feedback: 'Execute: SELECT company_id, SUM(amount) AS total_laundered_amount FROM transactions GROUP BY company_id;' };
        }
      },
      {
        id: 'L3_M3',
        title: 'Mission 3: Flag High-Volume Money Laundering Hubs',
        instruction: 'Join `transactions` with `shell_companies` to list company names whose total transaction sum exceeds $100,000.00. Use `INNER JOIN`, `GROUP BY`, and post-aggregation filtering with `HAVING SUM(t.amount) > 100000.00`.',
        conceptFocus: 'INNER JOIN + GROUP BY + HAVING SUM() > 100000',
        hint: 'SELECT c.company_name, c.registration_city, SUM(t.amount) AS total_funds FROM shell_companies c INNER JOIN transactions t ON c.company_id = t.company_id GROUP BY c.company_id, c.company_name, c.registration_city HAVING SUM(t.amount) > 100000.00;',
        hintCost: 35,
        sampleSolution: 'SELECT c.company_name, c.registration_city, SUM(t.amount) AS total_funds FROM shell_companies c INNER JOIN transactions t ON c.company_id = t.company_id GROUP BY c.company_id, c.company_name, c.registration_city HAVING SUM(t.amount) > 100000.00;',
        points: 250,
        validateResult: (rows) => {
          if (rows.length === 1) {
            const rowStr = JSON.stringify(rows[0]);
            if (rowStr.includes('Vanguard Imports') && (rowStr.includes('550000') || rowStr.includes('Port Crest'))) {
              return {
                isCorrect: true,
                feedback: 'PRIMARY SYNDICATE FRONT IDENTIFIED! Vanguard Imports in Port Crest laundered $550,000.00 in total illicit transfers.',
                clueDiscovered: 'Primary Laundering Hub Dismantled: Vanguard Imports (Port Crest) - Total Illicit Funds: $550,000.00.'
              };
            }
          }
          return { isCorrect: false, feedback: 'Chain shell_companies c and transactions t, GROUP BY c.company_id, c.company_name, c.registration_city, and filter with HAVING SUM(t.amount) > 100000.00.' };
        }
      }
    ],
    journalUnlockId: 'grouping_and_aggregations'
  },

  // ==========================================
  // LEVEL 4 / CASE FILE #004: SUBQUERIES & THE SHADOW KINGPIN
  // ==========================================
  {
    id: 4,
    levelNumber: 4,
    title: 'Case File #004: The Shadow Kingpin',
    subtitle: 'Unmasking the Syndicate Mastermind with Nested Subqueries',
    category: 'Subqueries',
    difficulty: 'Investigator',
    briefing: {
      incidentDate: 'Sep 03, 2026 · 11:30 PM',
      location: 'Seized Syndicate Communications Node',
      dossier: "With Vanguard Imports exposed in Case 003, we seized their encrypted comms database. The syndicate's mid-level lieutenants transmit direct orders to low-level operatives, but all messages use hidden agent IDs.\n\nOnly one top-tier boss—codenamed \"The Architect\"—issues commands with an operational risk rating higher than the average risk rating of all lieutenants combined. To uncover the boss's true identity, you must write nested queries (subqueries) to isolate who is operating above the organization's average risk threshold.",
      suspectTarget: 'Unmask "The Architect" from operational risk metrics'
    },
    tables: [
      {
        name: 'operatives',
        description: 'Syndicate personnel dossier and clearance registries.',
        columns: [
          { name: 'agent_id', type: 'INTEGER', isPrimaryKey: true, description: 'Agent tracking identifier (Primary Key)' },
          { name: 'alias', type: 'TEXT', description: 'Undercover syndicate alias' },
          { name: 'role', type: 'TEXT', description: 'Organizational rank (Lieutenant, Operative, Mastermind)' },
          { name: 'clearance_level', type: 'INTEGER', description: 'Security clearance tier (1-5)' }
        ],
        rows: [
          { agent_id: 301, alias: 'Viper', role: 'Lieutenant', clearance_level: 3 },
          { agent_id: 302, alias: 'Scythe', role: 'Lieutenant', clearance_level: 3 },
          { agent_id: 303, alias: 'Jackal', role: 'Lieutenant', clearance_level: 2 },
          { agent_id: 304, alias: 'Ghost', role: 'Operative', clearance_level: 1 },
          { agent_id: 305, alias: 'Architect', role: 'Mastermind', clearance_level: 5 }
        ]
      },
      {
        name: 'operations',
        description: 'Underworld operations logged in the comms network.',
        columns: [
          { name: 'op_id', type: 'INTEGER', isPrimaryKey: true, description: 'Operation incident code (Primary Key)' },
          { name: 'agent_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'operatives(agent_id)', description: 'Handling agent ID (Foreign Key)' },
          { name: 'op_name', type: 'TEXT', description: 'Operation codename' },
          { name: 'risk_score', type: 'INTEGER', description: 'Hazard index (1-100)' },
          { name: 'payout', type: 'REAL', description: 'Total operation payout in USD' }
        ],
        rows: [
          { op_id: 10, agent_id: 301, op_name: 'Harbor Smuggling', risk_score: 45, payout: 120000.00 },
          { op_id: 11, agent_id: 301, op_name: 'Customs Bribe', risk_score: 30, payout: 25000.00 },
          { op_id: 12, agent_id: 302, op_name: 'Armory Heist', risk_score: 65, payout: 300000.00 },
          { op_id: 13, agent_id: 303, op_name: 'Counterfeit Passports', risk_score: 20, payout: 15000.00 },
          { op_id: 14, agent_id: 304, op_name: 'Warehouse Guarding', risk_score: 10, payout: 5000.00 },
          { op_id: 15, agent_id: 305, op_name: 'Federal Reserve Breach', risk_score: 95, payout: 2500000.00 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L4_M1',
        title: 'Mission 1: Calculate the Average Risk Score (Scalar Subquery Intro)',
        instruction: 'Find the overall average `risk_score` across all logged operations in the syndicate database using `SELECT AVG(risk_score) AS avg_syndicate_risk FROM operations;`.',
        conceptFocus: 'Scalar Aggregate AVG()',
        hint: 'SELECT AVG(risk_score) AS avg_syndicate_risk FROM operations;',
        hintCost: 20,
        sampleSolution: 'SELECT AVG(risk_score) AS avg_syndicate_risk FROM operations;',
        points: 100,
        validateResult: (rows) => {
          if (rows && Array.isArray(rows) && rows.length === 1) {
            const val = Number(Object.values(rows[0] || {})[0]);
            if (!isNaN(val) && val > 44 && val < 45) {
              return {
                isCorrect: true,
                feedback: 'BENCHMARK RISK CALCULATED! The overall syndicate average risk score is ~44.17. Now we can use this benchmark to find rogue outliers.',
                clueDiscovered: 'Syndicate baseline risk threshold calculated at 44.17.'
              };
            }
          }
          return { isCorrect: false, feedback: 'Execute: SELECT AVG(risk_score) AS avg_syndicate_risk FROM operations;' };
        }
      },
      {
        id: 'L4_M2',
        title: 'Mission 2: Find High-Risk Operations Using a Subquery',
        instruction: 'Return all details (`op_name`, `agent_id`, `risk_score`, `payout`) for operations whose `risk_score` is greater than the average risk score of the entire syndicate using an embedded scalar subquery: `WHERE risk_score > (SELECT AVG(risk_score) FROM operations)`.',
        conceptFocus: 'WHERE col > (SELECT AVG(col) FROM ...)',
        hint: 'SELECT op_name, agent_id, risk_score, payout FROM operations WHERE risk_score > (SELECT AVG(risk_score) FROM operations);',
        hintCost: 25,
        sampleSolution: 'SELECT op_name, agent_id, risk_score, payout FROM operations WHERE risk_score > (SELECT AVG(risk_score) FROM operations);',
        points: 150,
        validateResult: (rows) => {
          if (rows && Array.isArray(rows) && rows.length === 3) {
            const rowValues = rows.flatMap(r => Object.values(r || {}));
            const hasBreach = rowValues.includes('Federal Reserve Breach');
            const hasHeist = rowValues.includes('Armory Heist');
            const hasSmuggling = rowValues.includes('Harbor Smuggling');
            if (hasBreach && hasHeist && hasSmuggling) {
              return {
                isCorrect: true,
                feedback: 'HIGH-RISK OPERATIONS ISOLATED! Three operations exceed the ~44.17 baseline risk. Note agent_id 305 with the astronomical 95 risk score!',
                clueDiscovered: 'Three high-risk operations identified; Agent #305 logged with extreme risk score (95).'
              };
            }
          }
          return { isCorrect: false, feedback: 'Execute: SELECT op_name, agent_id, risk_score, payout FROM operations WHERE risk_score > (SELECT AVG(risk_score) FROM operations);' };
        }
      },
      {
        id: 'L4_M3',
        title: 'Mission 3: Unmask "The Architect" (Subqueries with IN & JOIN)',
        instruction: "Unmask the identity, role, and clearance_level of the operative running operations where the payout is higher than the average payout of all operations conducted by 'Lieutenant' role members.",
        conceptFocus: 'Multi-row subquery with IN & nested sub-aggregation',
        hint: "SELECT alias, role, clearance_level FROM operatives WHERE agent_id IN (SELECT agent_id FROM operations WHERE payout > (SELECT AVG(payout) FROM operations WHERE agent_id IN (SELECT agent_id FROM operatives WHERE role = 'Lieutenant')));",
        hintCost: 35,
        sampleSolution: "SELECT alias, role, clearance_level FROM operatives WHERE agent_id IN (SELECT agent_id FROM operations WHERE payout > (SELECT AVG(payout) FROM operations WHERE agent_id IN (SELECT agent_id FROM operatives WHERE role = 'Lieutenant')));",
        points: 250,
        validateResult: (rows) => {
          if (rows && Array.isArray(rows) && rows.length > 0) {
            const hasArchitect = rows.some(r => {
              if (!r) return false;
              const values = Object.values(r);
              return (
                r.alias === 'Architect' ||
                r.role === 'Mastermind' ||
                Number(r.clearance_level) === 5 ||
                values.includes('Architect') ||
                values.includes('Mastermind') ||
                values.includes(5)
              );
            });
            if (hasArchitect) {
              return {
                isCorrect: true,
                feedback: 'THE ARCHITECT UNMASKED! Agent #305 (Alias: "Architect", Role: "Mastermind", Clearance: 5) is the criminal mastermind behind the Federal Reserve Breach. Mainframe coordinates locked!',
                clueDiscovered: 'The Architect Identified: Syndicate mastermind unmasked as Agent #305.'
              };
            }
          }
          return { isCorrect: false, feedback: "Unmask the mastermind using a nested subquery filtering operatives whose payout exceeds the Lieutenants' average payout." };
        }
      }
    ],
    journalUnlockId: 'subqueries_and_nested_selects'
  },

  // ==========================================
  // LEVEL 5 / CASE FILE #005: DATA MANIPULATION (INSERT, UPDATE, DELETE)
  // ==========================================
  {
    id: 5,
    levelNumber: 5,
    title: 'Case File #005: Covert Ops & Evidence Sanitization',
    subtitle: 'Sanitizing Corrupted Evidence & Neutralizing Decoy Records',
    category: 'DML',
    difficulty: 'Special Ops',
    briefing: {
      incidentDate: 'Sep 04, 2026 · 02:40 AM',
      location: 'Syndicate Central Mainframe & Evidence Locker',
      dossier: "We have successfully exposed the \"Architect\" and seized the syndicate's mainframe. However, an automated security protocol is attempting to purge our evidence locker while simultaneously inserting decoy suspect profiles into our live case database.\n\nTo safeguard the investigation, Chief Vance has ordered an immediate database sanitization operation. You must use data manipulation commands (INSERT, UPDATE, and DELETE) to neutralize malicious records, correct corrupted suspect files, and archive verified evidence before the server wipes itself.",
      suspectTarget: 'Neutralize decoy malware and archive Architect Decryption Key #504'
    },
    tables: [
      {
        name: 'evidence_vault',
        description: 'Primary evidence locker securing physical and digital exhibits.',
        columns: [
          { name: 'evidence_id', type: 'INTEGER', isPrimaryKey: true, description: 'Primary evidence tracking ID (Primary Key)' },
          { name: 'case_id', type: 'TEXT', description: 'Associated case file reference' },
          { name: 'item_description', type: 'TEXT', description: 'Item description and forensic notes' },
          { name: 'status', type: 'TEXT', description: 'Current state: Unverified, Secured, or Corrupted' },
          { name: 'chain_of_custody', type: 'TEXT', description: 'Officer holding verified custody' }
        ],
        rows: [
          { evidence_id: 501, case_id: 'CASE-001', item_description: 'Encrypted Hard Drive', status: 'Unverified', chain_of_custody: 'Officer Bullock' },
          { evidence_id: 502, case_id: 'CASE-001', item_description: 'Decoy Paperwork', status: 'Corrupted', chain_of_custody: 'Unknown' },
          { evidence_id: 503, case_id: 'CASE-002', item_description: 'Cloned Keycard #5002', status: 'Unverified', chain_of_custody: 'Detective Montoya' }
        ]
      },
      {
        name: 'active_suspects',
        description: 'Active suspect profiles currently flagged in district systems.',
        columns: [
          { name: 'suspect_id', type: 'INTEGER', isPrimaryKey: true, description: 'Suspect identification number (Primary Key)' },
          { name: 'full_name', type: 'TEXT', description: 'Suspect name or designation' },
          { name: 'threat_level', type: 'TEXT', description: 'Threat evaluation: Low, Medium, High, UNKNOWN' },
          { name: 'status', type: 'TEXT', description: 'Status: Active, Apprehended, Malicious_Insert' }
        ],
        rows: [
          { suspect_id: 101, full_name: 'Arthur Pendelton', threat_level: 'Low', status: 'Active' },
          { suspect_id: 102, full_name: 'Elena Rostova', threat_level: 'High', status: 'Active' },
          { suspect_id: 105, full_name: 'Damon Thorne', threat_level: 'Medium', status: 'Apprehended' },
          { suspect_id: 999, full_name: 'Glitch_Decoy_Bot', threat_level: 'UNKNOWN', status: 'Malicious_Insert' }
        ]
      }
    ],
    tasks: [
      {
        id: 'L5_M1',
        title: 'Mission 1: Neutralize Malicious Decoy Data (DELETE)',
        instruction: 'Remove the malicious decoy row inserted by the automated virus (`suspect_id = 999`) from the `active_suspects` table using `DELETE FROM active_suspects WHERE suspect_id = 999;`.',
        conceptFocus: 'DELETE FROM with WHERE condition',
        hint: 'DELETE FROM active_suspects WHERE suspect_id = 999;',
        hintCost: 25,
        sampleSolution: 'DELETE FROM active_suspects WHERE suspect_id = 999;',
        points: 150,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const hasDeleteKeyword = norm.includes('delete') && norm.includes('active_suspects');
          const hasDeletedId = norm.includes('999');
          const noDecoyRow = !rows.some(r => Number(r.suspect_id) === 999 || r.full_name === 'Glitch_Decoy_Bot');
          if ((hasDeleteKeyword && hasDeletedId) || (noDecoyRow && rows.length === 3)) {
            return {
              isCorrect: true,
              feedback: 'MALICIOUS DECOY NEUTRALIZED! Record 999 purged. Only authentic suspects (Pendelton, Rostova, Thorne) remain in active_suspects.',
              clueDiscovered: 'Decoy virus row #999 purged from active database.'
            };
          }
          return { isCorrect: false, feedback: 'Execute: DELETE FROM active_suspects WHERE suspect_id = 999;' };
        }
      },
      {
        id: 'L5_M2',
        title: 'Mission 2: Update Evidence Chain of Custody (UPDATE)',
        instruction: "Change the status of all unverified evidence items (`status = 'Unverified'`) in the `evidence_vault` to `'Secured'` using `UPDATE evidence_vault SET status = 'Secured' WHERE status = 'Unverified';`.",
        conceptFocus: 'UPDATE ... SET with WHERE condition',
        hint: "UPDATE evidence_vault SET status = 'Secured' WHERE status = 'Unverified';",
        hintCost: 30,
        sampleSolution: "UPDATE evidence_vault SET status = 'Secured' WHERE status = 'Unverified';",
        points: 180,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const isUpdateSyntax = norm.includes('update') && norm.includes('evidence_vault') && norm.includes('set') && norm.includes('secured');
          const r501 = rows.find(r => Number(r.evidence_id) === 501);
          const r503 = rows.find(r => Number(r.evidence_id) === 503);
          const isUpdated = (r501 && r501.status === 'Secured') && (r503 && r503.status === 'Secured');
          if (isUpdateSyntax || isUpdated) {
            return {
              isCorrect: true,
              feedback: "CHAIN OF CUSTODY VERIFIED! Records 501 and 503 successfully updated to 'Secured'. Corrupted decoy record 502 was safely isolated.",
              clueDiscovered: 'Chain of Custody Locked: Exhibits #501 and #503 verified.'
            };
          }
          return { isCorrect: false, feedback: "Execute: UPDATE evidence_vault SET status = 'Secured' WHERE status = 'Unverified';" };
        }
      },
      {
        id: 'L5_M3',
        title: 'Mission 3: Log Newly Seized Mastermind Evidence (INSERT INTO)',
        instruction: "Insert a new verified evidence record for the Architect's encrypted server key into `evidence_vault`: `evidence_id: 504`, `case_id: 'CASE-004'`, `item_description: 'Architect Primary Decryption Key'`, `status: 'Secured'`, `chain_of_custody: 'Lead Detective'`.",
        conceptFocus: 'INSERT INTO ... VALUES (...) statement',
        hint: "INSERT INTO evidence_vault (evidence_id, case_id, item_description, status, chain_of_custody) VALUES (504, 'CASE-004', 'Architect Primary Decryption Key', 'Secured', 'Lead Detective');",
        hintCost: 35,
        sampleSolution: "INSERT INTO evidence_vault (evidence_id, case_id, item_description, status, chain_of_custody) VALUES (504, 'CASE-004', 'Architect Primary Decryption Key', 'Secured', 'Lead Detective');",
        points: 250,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const isInsertSyntax = norm.includes('insert') && norm.includes('evidence_vault') && (norm.includes('504') || norm.includes('architect'));
          const r504 = rows.find(r => Number(r.evidence_id) === 504 || (r.item_description && r.item_description.includes('Architect Primary Decryption Key')));
          if (isInsertSyntax || r504) {
            return {
              isCorrect: true,
              feedback: 'DATABASE SANITIZED & ARCHIVED! Exhibit #504 logged under Lead Detective custody. Syndicate mainframe lockdown averted and investigation complete!',
              clueDiscovered: 'Decryption Key #504 Secured: Mastermind files unlocked.'
            };
          }
          return { isCorrect: false, feedback: "Execute: INSERT INTO evidence_vault (evidence_id, case_id, item_description, status, chain_of_custody) VALUES (504, 'CASE-004', 'Architect Primary Decryption Key', 'Secured', 'Lead Detective');" };
        }
      }
    ],
    journalUnlockId: 'dml_data_manipulation'
  },

  // ==========================================
  // LEVEL 6 / CASE FILE #006: COMPLEX JOINS & OUTER JOINS
  // ==========================================
  {
    id: 6,
    levelNumber: 6,
    title: 'Case File #006: The Inner Sanctum & Complex Joins',
    subtitle: 'Mapping Disjointed Safehouses & Auditing Rogue Assets',
    category: 'Outer Joins',
    difficulty: 'Master Sleuth',
    briefing: {
      incidentDate: 'Sep 05, 2026 · 04:15 AM',
      location: 'Subterranean Vault Network & Safehouse Coordinates',
      dossier: "With the syndicate's mainframe sanitized and their covert ops neutralized in Case 005, we have intercepted the final set of encrypted logs from the syndicate's private vault.\n\nTo hide their high-value assets, the syndicate split information across multiple disjointed registries: safehouse locations, vehicle ownership, assigned operatives, and high-value loot vaults. Some safehouses have no operatives assigned to them, while certain operatives are currently unassigned to any location.\n\nTo prepare for a simultaneous citywide raid, Chief Vance needs a master tactical report. You must use advanced join techniques (LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN logic) to map all assets—ensuring no hidden safehouse or rogue operative slips through the cracks.",
      suspectTarget: 'Tactical sweep of all safehouses, unassigned operatives & vaults'
    },
    tables: [
      {
        name: 'safehouses',
        description: 'Syndicate safehouses and hideouts across city districts.',
        columns: [
          { name: 'safehouse_id', type: 'INTEGER', isPrimaryKey: true, description: 'Safehouse tracking identifier (Primary Key)' },
          { name: 'codename', type: 'TEXT', description: 'Underground safehouse designation' },
          { name: 'district', type: 'TEXT', description: 'Metropolitan district zone' },
          { name: 'security_level', type: 'INTEGER', description: 'Defense & encryption tier (1-5)' }
        ],
        rows: [
          { safehouse_id: 101, codename: "The Raven's Nest", district: 'Docks District', security_level: 4 },
          { safehouse_id: 102, codename: 'Bunker Alpha', district: 'Industrial Zone', security_level: 5 },
          { safehouse_id: 103, codename: 'The Penthouse', district: 'Uptown', security_level: 3 },
          { safehouse_id: 104, codename: 'Ghost Station', district: 'Suburbs', security_level: 2 }
        ]
      },
      {
        name: 'assigned_operatives',
        description: 'Syndicate enforcers, technicians, and rogue hitmen.',
        columns: [
          { name: 'operative_id', type: 'INTEGER', isPrimaryKey: true, description: 'Operative tracking record (Primary Key)' },
          { name: 'full_name', type: 'TEXT', description: 'Operative alias / legal identity' },
          { name: 'safehouse_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'safehouses(safehouse_id)', description: 'Stationed safehouse (Foreign Key, Nullable)' },
          { name: 'role', type: 'TEXT', description: 'Assigned organizational specialty' }
        ],
        rows: [
          { operative_id: 301, full_name: 'Viktor Vance', safehouse_id: 101, role: 'Enforcer' },
          { operative_id: 302, full_name: 'Sienna Croft', safehouse_id: 102, role: 'Infiltrator' },
          { operative_id: 303, full_name: 'Gideon Sterling', safehouse_id: 101, role: 'Tech Specialist' },
          { operative_id: 304, full_name: 'Julian Mercer', safehouse_id: null, role: 'Rogue Hitman' }
        ]
      },
      {
        name: 'vault_assets',
        description: 'High-value contraband, encrypted servers, and gold caches stored in vaults.',
        columns: [
          { name: 'asset_id', type: 'INTEGER', isPrimaryKey: true, description: 'Vault asset serial reference (Primary Key)' },
          { name: 'safehouse_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'safehouses(safehouse_id)', description: 'Storage location (Foreign Key -> safehouses)' },
          { name: 'asset_name', type: 'TEXT', description: 'Item name / contraband description' },
          { name: 'estimated_value', type: 'REAL', description: 'Estimated asset valuation in USD' }
        ],
        rows: [
          { asset_id: 701, safehouse_id: 101, asset_name: 'Gold Bullion Chest', estimated_value: 500000.00 },
          { asset_id: 702, safehouse_id: 102, asset_name: 'Encrypted Server Rig', estimated_value: 250000.00 },
          { asset_id: 703, safehouse_id: 103, asset_name: 'Bearer Bonds Stack', estimated_value: 150000.00 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L6_M1',
        title: 'Mission 1: Audit All Safehouses Regardless of Operative Count (LEFT JOIN)',
        instruction: "List all safehouse codenames alongside their assigned operative names. Make sure safehouses with zero assigned operatives (like 'Ghost Station' and 'The Penthouse') still appear in the final report using a `LEFT JOIN` from `safehouses` to `assigned_operatives`.",
        conceptFocus: 'LEFT JOIN preserving all left table rows',
        hint: 'SELECT s.codename, s.district, o.full_name AS operative_name FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id;',
        hintCost: 25,
        sampleSolution: 'SELECT s.codename, s.district, o.full_name AS operative_name FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id;',
        points: 150,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const hasLeftJoin = norm.includes('left join') || norm.includes('left outer join');
          const hasSafehouseCol = rows.some(r => r.codename || r.district);
          if (rows.length === 5 && (hasLeftJoin || hasSafehouseCol)) {
            const hasGhostStation = rows.some(r => r.codename === 'Ghost Station');
            const hasRavenNest = rows.some(r => r.codename === "The Raven's Nest");
            const hasNullOperative = rows.some(r => {
              const vals = Object.values(r);
              return vals.includes(null) || vals.includes(undefined);
            });
            if (hasGhostStation && hasRavenNest && hasNullOperative) {
              return {
                isCorrect: true,
                feedback: "LEFT JOIN AUDIT COMPLETE! All 4 safehouse locations accounted for. Notice how 'Ghost Station' and 'The Penthouse' are preserved with NULL operative fields.",
                clueDiscovered: '4 safehouses mapped: 2 depots identified with zero stationed operatives.'
              };
            }
          }
          return { isCorrect: false, feedback: 'Execute: SELECT s.codename, s.district, o.full_name AS operative_name FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id;' };
        }
      },
      {
        id: 'L6_M2',
        title: 'Mission 2: Uncover Off-Grid Operatives (IS NULL Filtering)',
        instruction: 'Find all syndicate operatives who are not assigned to any known safehouse (`safehouse_id IS NULL`). Select `full_name` and `role` from `assigned_operatives`.',
        conceptFocus: 'WHERE safehouse_id IS NULL',
        hint: 'SELECT full_name, role FROM assigned_operatives WHERE safehouse_id IS NULL;',
        hintCost: 20,
        sampleSolution: 'SELECT full_name, role FROM assigned_operatives WHERE safehouse_id IS NULL;',
        points: 150,
        validateResult: (rows) => {
          if (rows.length === 1 && (rows[0].full_name === 'Julian Mercer' || rows[0].role === 'Rogue Hitman')) {
            return {
              isCorrect: true,
              feedback: "ROGUE OPERATIVE ISOLATED! Julian Mercer ('Rogue Hitman') is operating completely off-grid with no fixed safehouse assignment.",
              clueDiscovered: 'Rogue operative Julian Mercer identified with unlinked safehouse status.'
            };
          }
          return { isCorrect: false, feedback: 'Execute: SELECT full_name, role FROM assigned_operatives WHERE safehouse_id IS NULL;' };
        }
      },
      {
        id: 'L6_M3',
        title: 'Mission 3: Master Tactical Raid Report (Multi-Table Outer Joins)',
        instruction: 'Generate a complete intelligence overview showing every safehouse (`codename`, `district`), its total asset value (`COALESCE(SUM(a.estimated_value), 0.00) AS total_asset_value`), and the number of assigned operatives (`COUNT(DISTINCT o.operative_id) AS total_operatives`). Join `safehouses` with `assigned_operatives` and `vault_assets` using `LEFT JOIN`, grouped by `s.safehouse_id, s.codename, s.district`.',
        conceptFocus: 'Multi-table LEFT JOIN + GROUP BY + COALESCE()',
        hint: 'SELECT s.codename, s.district, COUNT(DISTINCT o.operative_id) AS total_operatives, COALESCE(SUM(a.estimated_value), 0.00) AS total_asset_value FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id LEFT JOIN vault_assets a ON s.safehouse_id = a.safehouse_id GROUP BY s.safehouse_id, s.codename, s.district;',
        hintCost: 35,
        sampleSolution: 'SELECT s.codename, s.district, COUNT(DISTINCT o.operative_id) AS total_operatives, COALESCE(SUM(a.estimated_value), 0.00) AS total_asset_value FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id LEFT JOIN vault_assets a ON s.safehouse_id = a.safehouse_id GROUP BY s.safehouse_id, s.codename, s.district;',
        points: 250,
        validateResult: (rows) => {
          if (rows.length === 4) {
            const hasGhostStation = rows.some(r => r.codename === 'Ghost Station');
            const hasRavenNest = rows.some(r => r.codename === "The Raven's Nest");
            const hasBunkerAlpha = rows.some(r => r.codename === 'Bunker Alpha');
            const hasPenthouse = rows.some(r => r.codename === 'The Penthouse');
            if (hasGhostStation && hasRavenNest && hasBunkerAlpha && hasPenthouse) {
              return {
                isCorrect: true,
                feedback: 'MASTER TACTICAL REPORT VERIFIED! All 4 safehouse locations mapped with accurate operative headcounts and vault valuations. Citywide raid authorized!',
                clueDiscovered: 'Inner Sanctum Raid Authorized: Comprehensive tactical sweep finalized.'
              };
            }
          }
          return { isCorrect: false, feedback: 'Chain safehouses s with assigned_operatives o and vault_assets a using LEFT JOIN, grouped by s.safehouse_id, s.codename, s.district.' };
        }
      }
    ],
    journalUnlockId: 'outer_joins_and_nulls'
  },

  // ==========================================
  // LEVEL 7 / CASE FILE #007: INDEXES & VIEWS
  // ==========================================
  {
    id: 7,
    levelNumber: 7,
    title: 'Case File #007: High-Frequency Surveillance & Cryptographic Views',
    subtitle: 'Performance Optimization & Secure Virtual Data Abstraction',
    category: 'Indexes & Views',
    difficulty: 'Cyber Chief',
    briefing: {
      incidentDate: 'Sep 06, 2026 · 01:10 AM',
      location: 'Syndicate Central Data Warehouse & High-Frequency Mesh',
      dossier: "We have breached the syndicate's central data warehouse. However, two major technical hurdles remain before we can issue automated warrants:\n\n1. Massive Data Volume: The surveillance_pings table contains millions of automated location records. Querying raw logs takes too long, slowing down active field ops.\n2. Data Privacy Constraints: Field officers need access to suspect profiles, but raw surveillance feeds contain classified internal security codes that lower-level detectives must not see.\n\nChief Vance wants you to optimize database performance and create a secure, simplified data view for field officers using Indexes and Views.",
      suspectTarget: 'Accelerate location lookups & isolate Critical risk suspects'
    },
    tables: [
      {
        name: 'suspect_registry',
        description: 'Classified master suspect profiles with clearance and cryptographic credentials.',
        columns: [
          { name: 'suspect_id', type: 'INTEGER', isPrimaryKey: true, description: 'Suspect tracking ID (Primary Key)' },
          { name: 'full_name', type: 'TEXT', description: 'Suspect full legal name' },
          { name: 'clearance_level', type: 'INTEGER', description: 'Internal security clearance tier (1-3)' },
          { name: 'encrypted_pin', type: 'TEXT', description: 'Classified cryptographic security token' },
          { name: 'risk_category', type: 'TEXT', description: 'Assessed danger tier: Low, High, Critical' }
        ],
        rows: [
          { suspect_id: 101, full_name: 'Arthur Pendelton', clearance_level: 1, encrypted_pin: '8f9b2c31e4', risk_category: 'Low' },
          { suspect_id: 102, full_name: 'Elena Rostova', clearance_level: 3, encrypted_pin: 'a1b2c3d4e5', risk_category: 'Critical' },
          { suspect_id: 103, full_name: 'Marcus Vance', clearance_level: 2, encrypted_pin: '99x88y77z6', risk_category: 'High' },
          { suspect_id: 105, full_name: 'Damon Thorne', clearance_level: 3, encrypted_pin: '3c2b1a4f5e', risk_category: 'Critical' }
        ]
      },
      {
        name: 'surveillance_pings',
        description: 'High-frequency automated location telemetry records.',
        columns: [
          { name: 'ping_id', type: 'INTEGER', isPrimaryKey: true, description: 'Unique telemetry ping identifier (Primary Key)' },
          { name: 'suspect_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'suspect_registry(suspect_id)', description: 'Target suspect foreign key' },
          { name: 'location_sector', type: 'TEXT', description: 'Geographic tracking sector' },
          { name: 'ping_timestamp', type: 'TEXT', description: 'Timestamp of captured broadcast' },
          { name: 'signal_strength', type: 'INTEGER', description: 'RF signal quality rating (1-100)' }
        ],
        rows: [
          { ping_id: 8001, suspect_id: 102, location_sector: 'Sector 4 - Docks', ping_timestamp: '2026-09-02 23:11:00', signal_strength: 92 },
          { ping_id: 8002, suspect_id: 105, location_sector: 'Sector 7 - Highrise', ping_timestamp: '2026-09-02 23:14:00', signal_strength: 88 },
          { ping_id: 8003, suspect_id: 101, location_sector: 'Sector 1 - Old Town', ping_timestamp: '2026-09-02 23:18:00', signal_strength: 45 },
          { ping_id: 8004, suspect_id: 102, location_sector: 'Sector 4 - Vault Rear', ping_timestamp: '2026-09-02 23:41:00', signal_strength: 99 },
          { ping_id: 8005, suspect_id: 105, location_sector: 'Sector 7 - Helipad', ping_timestamp: '2026-09-02 23:55:00', signal_strength: 94 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L7_M1',
        title: 'Mission 1: Accelerate Surveillance Searches (CREATE INDEX)',
        instruction: 'Field units constantly search `surveillance_pings` by `location_sector`. Create an index named `idx_location_sector` on the `location_sector` column to speed up lookup times.',
        conceptFocus: 'CREATE INDEX idx_name ON table_name (column)',
        hint: 'CREATE INDEX idx_location_sector ON surveillance_pings (location_sector);',
        hintCost: 20,
        sampleSolution: 'CREATE INDEX idx_location_sector ON surveillance_pings (location_sector);',
        points: 120,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const isIndex = norm.includes('create index') && norm.includes('idx_location_sector') && norm.includes('surveillance_pings') && norm.includes('location_sector');
          if (isIndex || (rows.length === 1 && rows[0].index_name === 'idx_location_sector')) {
            return {
              isCorrect: true,
              feedback: "INDEX DEPLOYED! 'idx_location_sector' successfully created on surveillance_pings. High-frequency sector lookups will now execute in sub-millisecond B-tree access time.",
              clueDiscovered: 'Index idx_location_sector active: Surveillance queries accelerated.'
            };
          }
          return { isCorrect: false, feedback: 'Execute: CREATE INDEX idx_location_sector ON surveillance_pings (location_sector);' };
        }
      },
      {
        id: 'L7_M2',
        title: 'Mission 2: Build a Secure Field View (CREATE VIEW)',
        instruction: 'Create a virtual table (View) named `field_suspect_summary` that exposes only `suspect_id`, `full_name`, and `risk_category` from `suspect_registry`, hiding classified columns like `encrypted_pin` and `clearance_level`.',
        conceptFocus: 'CREATE VIEW view_name AS SELECT ...',
        hint: 'CREATE VIEW field_suspect_summary AS SELECT suspect_id, full_name, risk_category FROM suspect_registry;',
        hintCost: 25,
        sampleSolution: 'CREATE VIEW field_suspect_summary AS SELECT suspect_id, full_name, risk_category FROM suspect_registry;',
        points: 150,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const isView = norm.includes('create view') && norm.includes('field_suspect_summary') && norm.includes('select') && norm.includes('from suspect_registry');
          if (isView || (rows.length === 1 && rows[0].view_name === 'field_suspect_summary')) {
            return {
              isCorrect: true,
              feedback: "SECURE VIEW COMPILED! 'field_suspect_summary' is now active. Classified encrypted PINs and clearance ratings are cleanly abstracted away from lower-tier field devices.",
              clueDiscovered: 'View field_suspect_summary established: Cryptographic credentials shielded.'
            };
          }
          return { isCorrect: false, feedback: 'Execute: CREATE VIEW field_suspect_summary AS SELECT suspect_id, full_name, risk_category FROM suspect_registry;' };
        }
      },
      {
        id: 'L7_M3',
        title: 'Mission 3: High-Priority Target Dispatch (SELECT from View + Join)',
        instruction: "Query the newly created `field_suspect_summary` view joined with `surveillance_pings` to retrieve the current location sector and ping timestamp for all targets categorized as 'Critical'. Select `full_name`, `risk_category`, `location_sector`, and `ping_timestamp`.",
        conceptFocus: 'SELECT from View with INNER JOIN & WHERE filter',
        hint: "SELECT f.full_name, f.risk_category, p.location_sector, p.ping_timestamp FROM field_suspect_summary f INNER JOIN surveillance_pings p ON f.suspect_id = p.suspect_id WHERE f.risk_category = 'Critical';",
        hintCost: 35,
        sampleSolution: "SELECT f.full_name, f.risk_category, p.location_sector, p.ping_timestamp FROM field_suspect_summary f INNER JOIN surveillance_pings p ON f.suspect_id = p.suspect_id WHERE f.risk_category = 'Critical';",
        points: 250,
        validateResult: (rows) => {
          if (rows.length === 4) {
            const hasElena = rows.some(r => r.full_name === 'Elena Rostova');
            const hasDamon = rows.some(r => r.full_name === 'Damon Thorne');
            const allCritical = rows.every(r => !r.risk_category || r.risk_category === 'Critical');
            if (hasElena && hasDamon && allCritical) {
              return {
                isCorrect: true,
                feedback: 'CRITICAL TARGETS INTERCEPTED! Elena Rostova and Damon Thorne tracked across Sectors 4 and 7 in real time. Tactical warrants dispatched and citywide syndicates dismantled!',
                clueDiscovered: 'Critical Targets Located: Tactical units dispatched to Sectors 4 & 7.'
              };
            }
          }
          return { isCorrect: false, feedback: "Join field_suspect_summary with surveillance_pings where risk_category = 'Critical'." };
        }
      }
    ],
    journalUnlockId: 'indexes_and_virtual_views'
  },

  // ==========================================
  // LEVEL 8 / CASE FILE #008: CONDITIONAL LOGIC (CASE WHEN)
  // ==========================================
  {
    id: 8,
    levelNumber: 8,
    title: 'Case File #008: Transaction Classification & Risk Scoring',
    subtitle: 'Conditional Logic & Dynamic Threat Scoring with CASE WHEN',
    category: 'Conditional Logic',
    difficulty: 'Forensic Director',
    briefing: {
      incidentDate: 'Sep 07, 2026 · 03:22 AM',
      location: 'Syndicate Offshore Clearinghouse & Asset Vaults',
      dossier: "With our surveillance network active in Case 007, we intercepted an active stream of financial movements from the syndicate's backup accounts in the audit_ledger table.\n\nBefore we freeze these assets, Chief Vance needs an automated risk assessment report. Raw dollar amounts don't tell the full story—a $5,000 transfer to an offshore bank is far more dangerous than a $50,000 local supply purchase. You must write conditional logic using CASE WHEN to dynamically categorize each transaction's threat level and flag accounts requiring immediate seizure.",
      suspectTarget: 'Classify transaction risk tiers & isolate accounts exceeding 80% high-risk volume'
    },
    tables: [
      {
        name: 'audit_ledger',
        description: 'Intercepted banking ledger entries with destination entities and risk flags.',
        columns: [
          { name: 'transaction_id', type: 'INTEGER', isPrimaryKey: true, description: 'Ledger transaction tracking code (Primary Key)' },
          { name: 'account_number', type: 'TEXT', description: 'Originating syndicate account ID' },
          { name: 'amount', type: 'REAL', description: 'Transferred financial volume in USD' },
          { name: 'destination_type', type: 'TEXT', description: 'Channel: Local Vendor, Offshore Bank, Crypto Exchange' },
          { name: 'is_flagged_country', type: 'INTEGER', description: 'High-risk jurisdiction flag: 1 (Yes) or 0 (No)' }
        ],
        rows: [
          { transaction_id: 901, account_number: 'ACC-4401', amount: 4500.00, destination_type: 'Local Vendor', is_flagged_country: 0 },
          { transaction_id: 902, account_number: 'ACC-8812', amount: 120000.00, destination_type: 'Offshore Bank', is_flagged_country: 1 },
          { transaction_id: 903, account_number: 'ACC-3319', amount: 15000.00, destination_type: 'Offshore Bank', is_flagged_country: 0 },
          { transaction_id: 904, account_number: 'ACC-8812', amount: 85000.00, destination_type: 'Crypto Exchange', is_flagged_country: 1 },
          { transaction_id: 905, account_number: 'ACC-1052', amount: 2500.00, destination_type: 'Local Vendor', is_flagged_country: 0 },
          { transaction_id: 906, account_number: 'ACC-4401', amount: 60000.00, destination_type: 'Crypto Exchange', is_flagged_country: 0 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L8_M1',
        title: 'Mission 1: Categorize Individual Transaction Risk (CASE WHEN)',
        instruction: "Label every transaction's threat level using conditional logic: 'CRITICAL' if destination_type = 'Offshore Bank' AND is_flagged_country = 1; 'HIGH' if destination_type = 'Crypto Exchange' OR amount > 50000.00; 'LOW' for all other transactions. Select transaction_id, account_number, amount, and the CASE WHEN expression as risk_level.",
        conceptFocus: 'CASE WHEN condition THEN ... ELSE ... END',
        hint: "SELECT transaction_id, account_number, amount, CASE WHEN destination_type = 'Offshore Bank' AND is_flagged_country = 1 THEN 'CRITICAL' WHEN destination_type = 'Crypto Exchange' OR amount > 50000.00 THEN 'HIGH' ELSE 'LOW' END AS risk_level FROM audit_ledger;",
        hintCost: 25,
        sampleSolution: "SELECT transaction_id, account_number, amount, CASE WHEN destination_type = 'Offshore Bank' AND is_flagged_country = 1 THEN 'CRITICAL' WHEN destination_type = 'Crypto Exchange' OR amount > 50000.00 THEN 'HIGH' ELSE 'LOW' END AS risk_level FROM audit_ledger;",
        points: 150,
        validateResult: (rows) => {
          if (rows.length === 6) {
            const r902 = rows.find(r => Number(r.transaction_id) === 902);
            const r904 = rows.find(r => Number(r.transaction_id) === 904);
            const r901 = rows.find(r => Number(r.transaction_id) === 901);
            const r906 = rows.find(r => Number(r.transaction_id) === 906);
            if (
              r902 && (r902.risk_level === 'CRITICAL' || Object.values(r902).includes('CRITICAL')) &&
              r904 && (r904.risk_level === 'HIGH' || Object.values(r904).includes('HIGH')) &&
              r901 && (r901.risk_level === 'LOW' || Object.values(r901).includes('LOW')) &&
              r906 && (r906.risk_level === 'HIGH' || Object.values(r906).includes('HIGH'))
            ) {
              return {
                isCorrect: true,
                feedback: 'THREAT CLASSIFICATION COMPLETE! Transaction #902 flagged as CRITICAL due to offshore flagged transfer. Transactions #904 and #906 tagged as HIGH risk.',
                clueDiscovered: 'Ledger Entries Classified: Transaction #902 identified as CRITICAL ($120,000 Offshore).'
              };
            }
          }
          return { isCorrect: false, feedback: "Apply CASE WHEN: WHEN destination_type = 'Offshore Bank' AND is_flagged_country = 1 THEN 'CRITICAL' WHEN destination_type = 'Crypto Exchange' OR amount > 50000.00 THEN 'HIGH' ELSE 'LOW' END AS risk_level." };
        }
      },
      {
        id: 'L8_M2',
        title: 'Mission 2: Conditional Aggregation by Account (SUM + CASE WHEN)',
        instruction: "Group transactions by `account_number` and calculate two custom totals: `total_volume` (SUM of all amounts) and `high_risk_volume` (SUM of amounts ONLY for transactions marked as 'Offshore Bank' or 'Crypto Exchange', treating others as 0.00).",
        conceptFocus: 'SUM(CASE WHEN ... THEN amount ELSE 0.00 END)',
        hint: "SELECT account_number, SUM(amount) AS total_volume, SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) AS high_risk_volume FROM audit_ledger GROUP BY account_number;",
        hintCost: 30,
        sampleSolution: "SELECT account_number, SUM(amount) AS total_volume, SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) AS high_risk_volume FROM audit_ledger GROUP BY account_number;",
        points: 200,
        validateResult: (rows) => {
          if (rows.length === 4) {
            const acc8812 = rows.find(r => r.account_number === 'ACC-8812');
            const acc4401 = rows.find(r => r.account_number === 'ACC-4401');
            const acc1052 = rows.find(r => r.account_number === 'ACC-1052');
            if (acc8812 && acc4401 && acc1052) {
              const vals8812 = Object.values(acc8812).map(Number);
              const vals4401 = Object.values(acc4401).map(Number);
              if (vals8812.includes(205000) && (vals4401.includes(64500) || vals4401.includes(60000))) {
                return {
                  isCorrect: true,
                  feedback: 'CONDITIONAL AGGREGATION AUDITED! Account ACC-8812 processed $205,000 entirely through offshore and crypto routes, while ACC-4401 routed $60,000 into crypto.',
                  clueDiscovered: 'Account Threat Profiles Mapped: ACC-8812 logged with $205,000.00 high-risk volume.'
                };
              }
            }
          }
          return { isCorrect: false, feedback: "Group by account_number and calculate SUM(amount) AS total_volume and SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) AS high_risk_volume." };
        }
      },
      {
        id: 'L8_M3',
        title: 'Mission 3: Flag High-Risk Seizure Targets (HAVING + CASE)',
        instruction: 'Filter grouped accounts to find accounts where the high-risk volume makes up more than 80% of their total transferred volume (`(high_risk_volume / total_volume) > 0.80`) using a `HAVING` clause with conditional aggregation.',
        conceptFocus: 'HAVING (SUM(CASE ...) / SUM(amount)) > 0.80',
        hint: "SELECT account_number, SUM(amount) AS total_volume, SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) AS high_risk_volume FROM audit_ledger GROUP BY account_number HAVING (SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) / SUM(amount)) > 0.80;",
        hintCost: 35,
        sampleSolution: "SELECT account_number, SUM(amount) AS total_volume, SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) AS high_risk_volume FROM audit_ledger GROUP BY account_number HAVING (SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) / SUM(amount)) > 0.80;",
        points: 250,
        validateResult: (rows) => {
          if (!rows || !Array.isArray(rows) || rows.length === 0) {
            return { isCorrect: false, feedback: 'No rows returned. Apply a HAVING filter to isolate accounts where high-risk volume exceeds 80% of total volume.' };
          }

          // Result-Based Validation: check that the target accounts ACC-8812 and ACC-3319 are returned
          const has8812 = rows.some(r => r && (r.account_number === 'ACC-8812' || Object.values(r).some(v => String(v).includes('ACC-8812'))));
          const has3319 = rows.some(r => r && (r.account_number === 'ACC-3319' || Object.values(r).some(v => String(v).includes('ACC-3319'))));
          const has1052 = rows.some(r => r && (r.account_number === 'ACC-1052' || Object.values(r).some(v => String(v).includes('ACC-1052'))));

          // ACC-1052 should never be in the high-risk seizure targets (it had 0% high risk)
          // Accept the accounts whether the query returns the 2 strictly highest or all accounts exceeding 80%
          if (has8812 && has3319 && !has1052 && (rows.length === 2 || rows.length === 3)) {
            return {
              isCorrect: true,
              feedback: 'SEIZURE WARRANTS AUTHORIZED! Accounts ACC-8812 and ACC-3319 confirmed for high-risk transfer volume. Freeze orders issued to the central bank!',
              clueDiscovered: 'Seizure Targets Locked: Accounts ACC-8812 and ACC-3319 flagged for immediate asset forfeiture.'
            };
          }
          return { isCorrect: false, feedback: "Apply HAVING filter: HAVING (SUM(CASE WHEN destination_type IN ('Offshore Bank', 'Crypto Exchange') THEN amount ELSE 0.00 END) / SUM(amount)) > 0.80;" };
        }
      }
    ],
    journalUnlockId: 'conditional_case_when'
  },

  // ==========================================
  // LEVEL 9 / CASE FILE #009: THE FINAL TAKEDOWN & ASSET SEIZURE
  // ==========================================
  {
    id: 9,
    levelNumber: 9,
    title: 'Case File #009: The Final Takedown & Asset Seizure',
    subtitle: 'Compound Multi-Entity Joins & ACID Transaction Execution',
    category: 'Transactions & ACID',
    difficulty: 'Master Sleuth',
    briefing: {
      incidentDate: 'Sep 30, 2026 · 10:00 AM',
      location: 'Syndicate Primary Command Node & District Court Vault',
      dossier: "This is it, Detective—the culmination of our entire investigation. We have surrounded the syndicate's primary operational command center.\n\nTo execute a clean, legal takedown, Chief Vance has authorized a citywide simultaneous strike across all 10 criminal divisions. Because we are making live updates to court-admissible evidence and executing active arrest warrants, data integrity is paramount. If a single warrant fails to issue or an asset seizure drops mid-execution, the whole syndicate could walk free on a technicality.\n\nYou must write a multi-table compound join query to identify the top ringleaders and execute the final asset seizure using ACID Transactions (BEGIN TRANSACTION, COMMIT, and ROLLBACK) to guarantee every update is saved atomically.",
      suspectTarget: 'Execute warrants for DIV-ALPHA & confiscate $5,200,000.00 in syndicate assets'
    },
    tables: [
      {
        name: 'arrest_warrants',
        description: 'Authorized judicial warrants for high-value syndicate ringleaders.',
        columns: [
          { name: 'warrant_id', type: 'INTEGER', isPrimaryKey: true, description: 'Judicial warrant ID (Primary Key)' },
          { name: 'suspect_id', type: 'INTEGER', description: 'Target suspect registry ID' },
          { name: 'division_code', type: 'TEXT', description: 'Enforcement taskforce division code' },
          { name: 'warrant_status', type: 'TEXT', description: 'Current judicial status: Pending Execution, EXECUTED' },
          { name: 'issued_date', type: 'TEXT', description: 'Court authorization date' }
        ],
        rows: [
          { warrant_id: 9001, suspect_id: 102, division_code: 'DIV-ALPHA', warrant_status: 'Pending Execution', issued_date: '2026-09-30' },
          { warrant_id: 9002, suspect_id: 103, division_code: 'DIV-BETA', warrant_status: 'Pending Execution', issued_date: '2026-09-30' },
          { warrant_id: 9003, suspect_id: 105, division_code: 'DIV-ALPHA', warrant_status: 'Pending Execution', issued_date: '2026-09-30' }
        ]
      },
      {
        name: 'seized_assets',
        description: 'Physical, real estate, and digital syndicate wealth slated for confiscation.',
        columns: [
          { name: 'asset_id', type: 'INTEGER', isPrimaryKey: true, description: 'Asset serial tracking code (Primary Key)' },
          { name: 'warrant_id', type: 'INTEGER', isForeignKey: true, foreignKeyTarget: 'arrest_warrants(warrant_id)', description: 'Associated warrant reference' },
          { name: 'asset_type', type: 'TEXT', description: 'Holding class: Gold, Real Estate, Crypto, Vehicle' },
          { name: 'liquidation_value', type: 'REAL', description: 'Appraised value in USD' },
          { name: 'transfer_status', type: 'TEXT', description: 'State: Unverified, CONFISCATED' }
        ],
        rows: [
          { asset_id: 4001, warrant_id: 9001, asset_type: 'Offshore Gold Reserves', liquidation_value: 1250000.00, transfer_status: 'Unverified' },
          { asset_id: 4002, warrant_id: 9001, asset_type: 'Crypto Cold Storage', liquidation_value: 850000.00, transfer_status: 'Unverified' },
          { asset_id: 4003, warrant_id: 9002, asset_type: 'Luxury Yacht', liquidation_value: 450000.00, transfer_status: 'Unverified' },
          { asset_id: 4004, warrant_id: 9003, asset_type: 'Prime Real Estate Portfolio', liquidation_value: 3100000.00, transfer_status: 'Unverified' }
        ]
      },
      {
        name: 'evidence_audit_log',
        description: 'Immutable judicial audit trail for seized assets and case closures.',
        columns: [
          { name: 'log_id', type: 'INTEGER', isPrimaryKey: true, description: 'Audit log entry ID (Primary Key)' },
          { name: 'action_type', type: 'TEXT', description: 'Logged procedural action' },
          { name: 'total_amount', type: 'REAL', description: 'Total currency transferred' },
          { name: 'timestamp', type: 'TEXT', description: 'Audit entry timestamp' }
        ],
        rows: []
      },
      {
        name: 'suspects',
        description: 'Master precinct suspect registry with identities and aliases.',
        columns: [
          { name: 'suspect_id', type: 'INTEGER', isPrimaryKey: true, description: 'Suspect tracking ID' },
          { name: 'full_name', type: 'TEXT', description: 'Suspect legal identity' },
          { name: 'alias', type: 'TEXT', description: 'Known underworld alias' },
          { name: 'clearance_level', type: 'INTEGER', description: 'Security tier' }
        ],
        rows: [
          { suspect_id: 101, full_name: 'Arthur Pendelton', alias: 'The Ghost', clearance_level: 1 },
          { suspect_id: 102, full_name: 'Elena Rostova', alias: 'Viper Queen', clearance_level: 3 },
          { suspect_id: 103, full_name: 'Marcus Vance', alias: 'The Banker', clearance_level: 2 },
          { suspect_id: 105, full_name: 'Damon Thorne', alias: 'Shadow King', clearance_level: 3 }
        ]
      }
    ],
    tasks: [
      {
        id: 'L9_M1',
        title: 'Mission 1: Cross-Verify Warrants & Holdings (Compound Joins)',
        instruction: "Perform a compound join linking arrest_warrants, seized_assets, and suspects matching on division_code = 'DIV-ALPHA' and warrant_status = 'Pending Execution'. Select s.full_name, w.warrant_id, w.division_code, a.asset_type, and a.liquidation_value.",
        conceptFocus: 'Multi-table INNER JOIN with composite WHERE filters',
        hint: "SELECT s.full_name, w.warrant_id, w.division_code, a.asset_type, a.liquidation_value FROM arrest_warrants w INNER JOIN suspects s ON w.suspect_id = s.suspect_id INNER JOIN seized_assets a ON w.warrant_id = a.warrant_id WHERE w.division_code = 'DIV-ALPHA' AND w.warrant_status = 'Pending Execution';",
        hintCost: 25,
        sampleSolution: "SELECT s.full_name, w.warrant_id, w.division_code, a.asset_type, a.liquidation_value FROM arrest_warrants w INNER JOIN suspects s ON w.suspect_id = s.suspect_id INNER JOIN seized_assets a ON w.warrant_id = a.warrant_id WHERE w.division_code = 'DIV-ALPHA' AND w.warrant_status = 'Pending Execution';",
        points: 150,
        validateResult: (rows) => {
          if (rows.length === 3) {
            const hasElena = rows.some(r => r.full_name === 'Elena Rostova');
            const hasDamon = rows.some(r => r.full_name === 'Damon Thorne');
            const hasGold = rows.some(r => r.asset_type === 'Offshore Gold Reserves');
            const hasCrypto = rows.some(r => r.asset_type === 'Crypto Cold Storage');
            const hasRealEstate = rows.some(r => r.asset_type === 'Prime Real Estate Portfolio');
            if (hasElena && hasDamon && hasGold && hasCrypto && hasRealEstate) {
              return {
                isCorrect: true,
                feedback: 'CROSS-VERIFICATION CONFIRMED! Target ringleaders Elena Rostova and Damon Thorne tied to $5,200,000.00 in DIV-ALPHA holdings. Warrants ready for atomic execution.',
                clueDiscovered: 'Compound Warrant Audit Complete: 3 high-value holdings tied to DIV-ALPHA.'
              };
            }
          }
          return { isCorrect: false, feedback: "Execute: SELECT s.full_name, w.warrant_id, w.division_code, a.asset_type, a.liquidation_value FROM arrest_warrants w INNER JOIN suspects s ON w.suspect_id = s.suspect_id INNER JOIN seized_assets a ON w.warrant_id = a.warrant_id WHERE w.division_code = 'DIV-ALPHA' AND w.warrant_status = 'Pending Execution';" };
        }
      },
      {
        id: 'L9_M2',
        title: 'Mission 2: Execute Atomic Asset Seizure (BEGIN TRANSACTION & COMMIT)',
        instruction: "Safely execute warrants and transfer all pending assets in 'DIV-ALPHA' by executing a multi-step atomic transaction: BEGIN TRANSACTION; UPDATE arrest_warrants to 'EXECUTED'; UPDATE seized_assets to 'CONFISCATED'; log the total seized sum ($5,200,000.00) into evidence_audit_log; COMMIT;",
        conceptFocus: 'BEGIN TRANSACTION ... UPDATE ... INSERT ... COMMIT',
        hint: "BEGIN TRANSACTION;\n\nUPDATE arrest_warrants\nSET warrant_status = 'EXECUTED'\nWHERE division_code = 'DIV-ALPHA';\n\nUPDATE seized_assets\nSET transfer_status = 'CONFISCATED'\nWHERE warrant_id IN (\n    SELECT warrant_id \n    FROM arrest_warrants \n    WHERE division_code = 'DIV-ALPHA'\n);\n\nINSERT INTO evidence_audit_log (log_id, action_type, total_amount, timestamp)\nVALUES (1, 'FINAL_SYNDICATE_SEIZURE', 5200000.00, '2026-09-30 10:30:00');\n\nCOMMIT;",
        hintCost: 35,
        sampleSolution: "BEGIN TRANSACTION;\n\nUPDATE arrest_warrants\nSET warrant_status = 'EXECUTED'\nWHERE division_code = 'DIV-ALPHA';\n\nUPDATE seized_assets\nSET transfer_status = 'CONFISCATED'\nWHERE warrant_id IN (\n    SELECT warrant_id \n    FROM arrest_warrants \n    WHERE division_code = 'DIV-ALPHA'\n);\n\nINSERT INTO evidence_audit_log (log_id, action_type, total_amount, timestamp)\nVALUES (1, 'FINAL_SYNDICATE_SEIZURE', 5200000.00, '2026-09-30 10:30:00');\n\nCOMMIT;",
        points: 300,
        validateResult: (rows, columns, rawQuery) => {
          const norm = (rawQuery || '').toLowerCase();
          const hasBegin = norm.includes('begin');
          const hasCommit = norm.includes('commit');
          const hasUpdate = norm.includes('update') && norm.includes('executed') && norm.includes('confiscated');
          const hasInsert = norm.includes('insert') && norm.includes('evidence_audit_log');
          if (hasBegin && hasCommit && hasUpdate && hasInsert) {
            return {
              isCorrect: true,
              feedback: 'SYNDICATE TAKEDOWN COMPLETE! All 10 cases resolved, $5,200,000.00 in illicit assets secured in the evidence vault, and all warrants executed without a single transaction error. Chief Vance commends your forensic brilliance!',
              clueDiscovered: 'Grand Takedown Executed: All syndicate assets confiscated and case files closed!'
            };
          }
          return { isCorrect: false, feedback: 'Wrap your multi-step seizure script in BEGIN TRANSACTION; and COMMIT; with UPDATE arrest_warrants, UPDATE seized_assets, and INSERT INTO evidence_audit_log.' };
        }
      }
    ],
    journalUnlockId: 'acid_transactions'
  }
];
