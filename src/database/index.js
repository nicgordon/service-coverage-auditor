import _ from 'lodash';
import { SQLite } from 'expo';

import { DATABASE_NAME } from '../constants';

const database = SQLite.openDatabase(DATABASE_NAME);

/**
 * Helper function that promisifies database transactions.
 * @param {string} sql - SQL query with ? placeholders.
 * @param {Array=} params - Parameters that are inserted into the SQL query in the order that ? is encountered.
 */
const performTransaction = (sql, params = []) =>
  new Promise((resolve, reject) => {
    database.transaction(
      tx => {
        tx.executeSql(
          sql,
          params,
          function onExecutionSuccess(transaction, resultSet) {
            resolve(resultSet);
          },
          function onExecutionError(transaction, error) {
            reject(error);
          },
        );
      },
      function onTransactionError(error) {
        reject(error);
      },
    );
  });

/**
 * Sets up the database by adding tables if they don't exist.
 */
const prepare = async () => {
  const auditTableSql = `create table if not exists audit (
    id integer primary key not null,
    startedAt text,
    network text,
    endpoint text
  );`;

  const pingTableSql = `create table if not exists ping (
    id integer primary key not null,
    auditId integer not null,
    createdAt text,
    result integer,
    latitude double,
    longitude double
  );`;

  try {
    await performTransaction(auditTableSql);
    await performTransaction(pingTableSql);
  } catch (error) {
    // Just throw errors for now
    throw error;
  }
};

/**
 * Creates a new audit record.
 */
const createAudit = async ({ startedAt, network, endpoint }) => {
  const sql = `insert into audit (startedAt, network, endpoint) values (?, ?, ?);`;
  const params = [startedAt, network, endpoint];

  try {
    const audits = await performTransaction(sql, params);
    return _.get(audits, 'rows.array', []);
  } catch (error) {
    // Just throw errors for now
    throw error;
  }
};

/**
 * Fetches all audit records.
 */
const fetchAllAudits = async () => {
  const sql = `select * from audit;`;

  try {
    const audits = await performTransaction(sql);
    return _.get(audits, 'rows.array', []);
  } catch (error) {
    // Just throw errors for now
    throw error;
  }
};

/**
 * Fetches an audit record by its id.
 */
const fetchAudit = async id => {
  const sql = `select * from audit where id = ?;`;
  const params = [id];

  try {
    const audits = await performTransaction(sql, params);
    return _.get(audits, 'rows.array', []);
  } catch (error) {
    // Just throw errors for now
    throw error;
  }
};

/**
 * Fetches pings by it audit id.
 */
const fetchPingsByAuditId = async auditId => {
  const sql = `select * from ping where auditId = ?;`;
  const params = [auditId];

  try {
    const audits = await performTransaction(sql, params);
    return _.get(audits, 'rows.array', []);
  } catch (error) {
    // Just throw errors for now
    throw error;
  }
};

// deleteAudit

// saveAudit

export default {
  createAudit,
  fetchAllAudits,
  fetchAudit,
  fetchPingsByAuditId,
  prepare,
};
