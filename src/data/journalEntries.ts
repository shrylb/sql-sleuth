import { JournalEntry } from '../types';

export const JOURNAL_ENTRIES: JournalEntry[] = [
  // 1. Level 0: Orientation (Single Table Basics)
  {
    id: 'tables_and_columns',
    title: 'Journal Entry #1: Anatomy of a Database (Tables, Rows & Columns)',
    topic: 'Orientation',
    levelRequired: 0,
    summary: 'A Relational Database stores structured forensic data in tables (relations). Each table represents an entity (e.g. suspects, evidence inventory), where horizontal rows represent individual records and vertical columns represent specific forensic attributes.',
    cheatSheet: [
      {
        syntax: 'SELECT * FROM table_name;',
        explanation: 'Retrieves all columns (wildcard selector *) and every row in the specified table.',
        example: 'SELECT * FROM evidence_registry;'
      },
      {
        syntax: 'SELECT col1, col2 FROM table_name;',
        explanation: 'Retrieves only specified columns, reducing noise and focusing on relevant forensic attributes.',
        example: 'SELECT item_name, location FROM evidence_registry;'
      }
    ],
    detectiveTip: 'In forensic investigations, never dump all columns if you only need names and locations. Specific column projection keeps terminal logs clean and queries fast.'
  },

  // 2. Level 1: Filtering (WHERE, AND, OR, LIKE)
  {
    id: 'filtering_clauses',
    title: 'Journal Entry #2: Advanced Filtering & Pattern Matching',
    topic: 'Filtering',
    levelRequired: 1,
    summary: 'The WHERE clause restricts results so only rows meeting certain conditions are returned. Logical operators AND / OR allow compound criteria, comparison operators filter numerical bounds, and LIKE with % acts as an investigative wildcard.',
    cheatSheet: [
      {
        syntax: 'WHERE column = value',
        explanation: 'Basic equality filter. Strings must be enclosed in single quotes.',
        example: "WHERE jacket_color = 'Black'"
      },
      {
        syntax: 'WHERE cond1 AND cond2',
        explanation: 'Requires both conditions to be true for a row to be returned.',
        example: "WHERE last_known_location = '5th Avenue' AND has_priors = 1"
      },
      {
        syntax: 'WHERE cond1 OR cond2',
        explanation: 'Returns a row if either condition is true.',
        example: "WHERE height_inches > 66 OR alias LIKE '%Shadow%'"
      },
      {
        syntax: 'Comparison Operators (>, <, >=, <=, !=)',
        explanation: 'Used to filter numerical ranges and threshold comparisons.',
        example: 'WHERE height_inches > 66'
      },
      {
        syntax: "WHERE column LIKE '%pattern%'",
        explanation: 'Searches for specified patterns in text. The % wildcard matches zero, one, or multiple characters.',
        example: "WHERE alias LIKE '%Shadow%'"
      }
    ],
    detectiveTip: 'Combine AND with comparison operators to rapidly eliminate suspects who do not match physical forensic profiles (such as height or location).'
  },

  // 3. Level 2: Relational Keys & INNER JOINs
  {
    id: 'inner_joins',
    title: 'Journal Entry #3: Relational Keys & INNER JOINs',
    topic: 'Joins',
    levelRequired: 2,
    summary: 'Relational databases connect data across multiple tables using Primary Keys and Foreign Keys. INNER JOIN merges matching rows across tables based on common keys, and table aliases keep complex multi-table queries concise and readable.',
    cheatSheet: [
      {
        syntax: 'Primary Key (PK)',
        explanation: 'A column containing unique values that uniquely identifies each row in a table (e.g., suspect_id in suspects).',
        example: 'suspect_id INT PRIMARY KEY'
      },
      {
        syntax: 'Foreign Key (FK)',
        explanation: 'A column in one table that refers to the Primary Key in another table, establishing a relationship (e.g., badge_registry.suspect_id points to suspects.suspect_id).',
        example: 'FOREIGN KEY (suspect_id) REFERENCES suspects(suspect_id)'
      },
      {
        syntax: 'INNER JOIN tableB ON tableA.key = tableB.key',
        explanation: 'Merges rows from two or more tables when the join condition is satisfied across matching keys.',
        example: 'SELECT * FROM door_logs INNER JOIN badge_registry ON door_logs.badge_id = badge_registry.badge_id;'
      },
      {
        syntax: 'Table Aliases (FROM door_logs d JOIN badge_registry b ...)',
        explanation: 'Short labels assigned in queries to make complex multi-table queries cleaner and easier to read.',
        example: 'SELECT s.full_name, d.door_location FROM door_logs d INNER JOIN badge_registry b ON d.badge_id = b.badge_id INNER JOIN suspects s ON b.suspect_id = s.suspect_id;'
      }
    ],
    detectiveTip: 'Follow the relational breadcrumbs: start at physical sensor events (door_logs), match the foreign key to credential registries (badge_registry), and join back to the master suspect profiles (suspects).'
  },

  // 4. Level 3: Aggregation & Grouping
  {
    id: 'grouping_and_aggregations',
    title: 'Journal Entry #4: Data Aggregation & Summarization',
    topic: 'Aggregation',
    levelRequired: 3,
    summary: 'Aggregate functions compute summary metrics across sets of records. GROUP BY collates identical column values into single summary rows, and HAVING filters those aggregated groups after calculation.',
    cheatSheet: [
      {
        syntax: 'Aggregate Functions: COUNT(), SUM(), AVG(), MIN(), MAX()',
        explanation: 'Compute a single summary value across multiple rows: COUNT() counts rows, SUM() calculates numeric totals, and AVG/MIN/MAX calculate statistical thresholds.',
        example: 'SELECT COUNT(transaction_id), SUM(amount) FROM transactions;'
      },
      {
        syntax: 'GROUP BY column_name',
        explanation: 'Groups rows sharing the same values in specified columns into summary rows (e.g., grouping all transactions by company_id).',
        example: 'SELECT company_id, COUNT(transaction_id) AS total_transactions FROM transactions GROUP BY company_id;'
      },
      {
        syntax: 'HAVING aggregate_condition',
        explanation: 'WHERE filters individual rows BEFORE aggregation. HAVING filters aggregated groups AFTER GROUP BY calculations are complete.',
        example: 'SELECT company_id, SUM(amount) FROM transactions GROUP BY company_id HAVING SUM(amount) > 100000.00;'
      }
    ],
    detectiveTip: 'Golden Rule of Forensics: Filter raw individual records using WHERE, but filter consolidated group totals using HAVING.'
  },

  // 5. Level 4: Subqueries & Nested SELECTs
  {
    id: 'subqueries_and_nested_selects',
    title: 'Journal Entry #5: Subqueries & Nested SELECT Statements',
    topic: 'Subqueries',
    levelRequired: 4,
    summary: 'A subquery (or inner query) is an embedded SELECT statement nested inside another SQL statement. Subqueries compute dynamic benchmarks (such as average risk or top payouts) on the fly, feeding calculated metrics directly into outer WHERE, HAVING, or FROM clauses.',
    cheatSheet: [
      {
        syntax: 'Scalar Subquery: WHERE column > (SELECT AVG(col) FROM ...)',
        explanation: 'Returns a single value (one row, one column), suitable for comparison operators (=, >, <, >=, <=) in the outer query filter.',
        example: 'SELECT op_name, risk_score FROM operations WHERE risk_score > (SELECT AVG(risk_score) FROM operations);'
      },
      {
        syntax: 'Multi-row Subquery: WHERE column IN (SELECT id FROM ...)',
        explanation: 'Returns a list of values, allowing the outer query to match against multiple candidates using the IN keyword.',
        example: "SELECT alias FROM operatives WHERE agent_id IN (SELECT agent_id FROM operations WHERE payout > 100000);"
      },
      {
        syntax: 'Nested Subquery Execution Order',
        explanation: 'Inner subqueries evaluate first. Their returned results are substituted into the enclosing outer query before outer filtering executes.',
        example: "SELECT alias FROM operatives WHERE agent_id IN (SELECT agent_id FROM operations WHERE payout > (SELECT AVG(payout) FROM operations));"
      }
    ],
    detectiveTip: 'Subquery Superpower: When you do not know the exact benchmark ahead of time (such as "higher than the average risk"), use a subquery to compute the benchmark dynamically!'
  },

  // 6. Level 5: Data Manipulation Language (DML)
  {
    id: 'dml_data_manipulation',
    title: 'Journal Entry #6: Data Manipulation Language (DML)',
    topic: 'Data Manipulation',
    levelRequired: 5,
    summary: 'Data Manipulation Language (DML) provides commands to modify, update, and prune database contents: INSERT INTO adds new evidence records, UPDATE modifies existing attribute states, and DELETE removes corrupted or malicious data.',
    cheatSheet: [
      {
        syntax: 'INSERT INTO table_name (col1, col2, ...) VALUES (val1, val2, ...);',
        explanation: 'Appends new rows of data into a table. Always ensure provided values match the table column data types.',
        example: "INSERT INTO evidence_vault (evidence_id, case_id, item_description, status, chain_of_custody) VALUES (504, 'CASE-004', 'Architect Primary Decryption Key', 'Secured', 'Lead Detective');"
      },
      {
        syntax: 'UPDATE table_name SET col1 = val1, col2 = val2 WHERE condition;',
        explanation: 'Modifies existing data within specified columns. Crucial: Always use a WHERE clause; omitting WHERE updates every single row in the table!',
        example: "UPDATE evidence_vault SET status = 'Secured' WHERE status = 'Unverified';"
      },
      {
        syntax: 'DELETE FROM table_name WHERE condition;',
        explanation: 'Permanently removes matching rows from a table. Like UPDATE, omitting a WHERE clause deletes all records in the table.',
        example: 'DELETE FROM active_suspects WHERE suspect_id = 999;'
      }
    ],
    detectiveTip: 'Safety Protocol: Always test your filter with a SELECT query first before executing destructive UPDATE or DELETE statements!'
  },

  // 7. Level 6: Outer Joins & NULL Handling
  {
    id: 'outer_joins_and_nulls',
    title: 'Journal Entry #7: Outer Joins & NULL Handling',
    topic: 'Advanced Joins',
    levelRequired: 6,
    summary: 'Outer Joins preserve records that do not find a matching pair across joined tables. LEFT JOIN retains every record from the left table, populating NULL for missing right attributes. Combining LEFT JOIN with IS NULL and COALESCE() enables comprehensive tactical reporting without dropping orphan assets.',
    cheatSheet: [
      {
        syntax: 'LEFT JOIN right_table ON left_table.key = right_table.key',
        explanation: 'Returns all rows from the left table, plus matching rows from the right table. Unmatched right rows return NULL instead of being filtered out.',
        example: 'SELECT s.codename, s.district, o.full_name FROM safehouses s LEFT JOIN assigned_operatives o ON s.safehouse_id = o.safehouse_id;'
      },
      {
        syntax: 'WHERE column_name IS NULL / IS NOT NULL',
        explanation: 'Used in WHERE clauses to test whether relational key fields or joined attributes are missing (NULL) or populated (IS NOT NULL).',
        example: 'SELECT full_name, role FROM assigned_operatives WHERE safehouse_id IS NULL;'
      },
      {
        syntax: 'COALESCE(column, fallback_value)',
        explanation: 'Replaces NULL values with a specified default value (e.g. converting a NULL sum to 0.00 for empty vaults).',
        example: 'SELECT s.codename, COALESCE(SUM(a.estimated_value), 0.00) AS total_val FROM safehouses s LEFT JOIN vault_assets a ON s.safehouse_id = a.safehouse_id GROUP BY s.codename;'
      }
    ],
    detectiveTip: 'Outer Join Rule of Thumb: When you need a complete catalog of master entities (such as all safehouses), regardless of whether they have linked operatives or assets, always reach for LEFT JOIN instead of INNER JOIN.'
  },

  // 8. Level 7: Indexes & Virtual Views
  {
    id: 'indexes_and_virtual_views',
    title: 'Journal Entry #8: Indexes & Virtual Views',
    topic: 'Performance & Views',
    levelRequired: 7,
    summary: 'Indexes and Views are fundamental architectural tools in production RDBMS: CREATE INDEX builds specialized B-tree lookup trees on high-traffic columns to accelerate search latency, while CREATE VIEW constructs reusable virtual tables that encapsulate complex joins and mask sensitive columns for security.',
    cheatSheet: [
      {
        syntax: 'CREATE INDEX index_name ON table_name (column_name);',
        explanation: 'Builds a specialized lookup structure on specified columns. Greatly speeds up SELECT queries with WHERE filters, with minor overhead during INSERT/UPDATE.',
        example: 'CREATE INDEX idx_location_sector ON surveillance_pings (location_sector);'
      },
      {
        syntax: 'CREATE VIEW view_name AS SELECT col1, col2 FROM table_name;',
        explanation: 'Saves a SELECT query as a reusable virtual table. Does not duplicate physical data—dynamically fetches from underlying tables when referenced.',
        example: 'CREATE VIEW field_suspect_summary AS SELECT suspect_id, full_name, risk_category FROM suspect_registry;'
      },
      {
        syntax: 'SELECT * FROM view_name WHERE condition;',
        explanation: 'Queries a view identically to a physical table, supporting INNER JOIN, WHERE, and GROUP BY operations.',
        example: "SELECT f.full_name, p.location_sector FROM field_suspect_summary f INNER JOIN surveillance_pings p ON f.suspect_id = p.suspect_id WHERE f.risk_category = 'Critical';"
      }
    ],
    detectiveTip: 'Security & Speed: Use Indexes to accelerate high-volume queries with WHERE filters, and use Views as a security firewall to hide classified columns from client applications.'
  },

  // 9. Level 8: Conditional Logic (CASE WHEN)
  {
    id: 'conditional_case_when',
    title: 'Journal Entry #9: Conditional Logic (CASE WHEN)',
    topic: 'Conditional Logic',
    levelRequired: 8,
    summary: 'The CASE WHEN expression provides powerful conditional branching inside SQL statements. It evaluates predicates sequentially from top to bottom, returning the first matching value. When embedded inside aggregate functions like SUM() or COUNT(), it enables multi-condition aggregation across an entire dataset in a single scan.',
    cheatSheet: [
      {
        syntax: 'CASE WHEN condition1 THEN res1 WHEN condition2 THEN res2 ELSE fallback END',
        explanation: 'Evaluates each condition in sequence and returns the first matching outcome. If no condition is met, the ELSE value is returned.',
        example: "SELECT transaction_id, CASE WHEN amount > 50000 THEN 'HIGH' ELSE 'LOW' END AS risk FROM audit_ledger;"
      },
      {
        syntax: 'SUM(CASE WHEN condition THEN column_or_1 ELSE 0 END)',
        explanation: 'Conditional aggregation: Accumulates values or counts only for records matching specific criteria, treating non-matching rows as 0.',
        example: "SELECT account_number, SUM(CASE WHEN destination_type = 'Crypto Exchange' THEN amount ELSE 0 END) AS crypto_total FROM audit_ledger GROUP BY account_number;"
      },
      {
        syntax: 'HAVING (conditional_sum / total_sum) > threshold',
        explanation: 'Filters grouped summary metrics based on calculated conditional ratios or percentage thresholds.',
        example: "SELECT account_number FROM audit_ledger GROUP BY account_number HAVING (SUM(CASE WHEN is_flagged_country = 1 THEN amount ELSE 0 END) / SUM(amount)) > 0.80;"
      }
    ],
    detectiveTip: 'Forensic Pivot Trick: Use SUM(CASE WHEN ...) to transform categorical row values into customized analytical columns without complex subqueries or self-joins!'
  },

  // 10. Level 9: Transactions & ACID
  {
    id: 'acid_transactions',
    title: 'Journal Entry #10: Database Transactions & Atomic Operations',
    topic: 'Transactions & ACID',
    levelRequired: 9,
    summary: 'Relational databases enforce ACID properties (Atomicity, Consistency, Isolation, and Durability) to guarantee data safety during critical business operations. Transactions enforce the "All or Nothing" principle: multiple dependent modifications succeed collectively or fail completely without leaving orphan records or partial updates.',
    cheatSheet: [
      {
        syntax: 'BEGIN TRANSACTION;',
        explanation: 'Opens a protected transaction block. All subsequent modifications are staged in isolation from other database sessions.',
        example: 'BEGIN TRANSACTION;'
      },
      {
        syntax: 'COMMIT;',
        explanation: 'Permanently records all staged modifications within the current transaction block to persistent disk storage.',
        example: 'COMMIT;'
      },
      {
        syntax: 'ROLLBACK;',
        explanation: 'Immediately aborts the transaction and reverts all modifications back to the exact pre-transaction database state.',
        example: 'ROLLBACK;'
      }
    ],
    detectiveTip: 'The Golden Rule of Data Integrity: When making multi-table updates that depend on each other (such as executing a warrant and seizing an asset), ALWAYS wrap them in BEGIN TRANSACTION ... COMMIT!'
  }
];
