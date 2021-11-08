import React, { useState } from "react";
import styled from "styled-components";

// Components
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import NumberFormat from "react-number-format";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";

// Controls
import DropDown from "./Fields/DropDown";

// Types
import { Currencies } from "../types/Currency";

// Constants
import { HEADER_COLUMNS } from "../constants/header_columns";
import { RATE } from "../constants/currency_rate";

// Helpers
import {
  getUserByCardId,
  getMerchantById,
  getLastTransactionByCardId
} from "../helpers";

// Mocks
import Transactions from "../mocks/transactions";
import Users from "../mocks/users";

const StyleContainer = styled(Container)`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 20px 20px;
`;

const StyleBox = styled(Box)`
  padding: 20px;
`;

const StyleAmount = styled(Typography)`
  font-weight: 600;
  font-size: 3rem;
  color: var(--red);
`;

const SummaryWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 2rem;
`;

const UserSummary = styled.div`
  min-width: 200px;
  min-height: 150px;
  border: 1px solid var(--lightGrey);
  border-radius: 20px;
  padding: 10px;
`;

const Home = () => {
  // States
  const [currency, setCurrency] = useState("USD");

  const calculateCurrencyConverstion = amount => {
    if (currency === "CAD") {
      return parseFloat(amount * RATE).toFixed(2);
    } else {
      return parseFloat(amount).toFixed(2);
    }
  };

  return (
    <StyleContainer>
      <StyleBox>
        <DropDown
          label="Currency"
          name="currency"
          options={Currencies}
          value={currency}
          onChange={e => setCurrency(e.target.value)}
        />
      </StyleBox>
      <StyleBox>
        <h1>
          <div>Summary Last Transaction: </div>
        </h1>
        <SummaryWrap>
          {Users.map(user => {
            const trans = getLastTransactionByCardId(user.card_id);
            if (trans) {
              return (
                <UserSummary key={user.id}>
                  <Typography variant="h5" gutterBottom component="div">
                    {user.name}
                  </Typography>
                  <StyleAmount variant="h6" gutterBottom component="div">
                    <NumberFormat
                      value={calculateCurrencyConverstion(trans.usd_amount)}
                      displayType={"text"}
                      thousandSeparator={true}
                      prefix={"$"}
                    />
                    <span>{currency}</span>
                  </StyleAmount>
                  <Typography variant="h6" gutterBottom component="div">
                    at {getMerchantById(trans.merchant_id).name}
                  </Typography>
                </UserSummary>
              );
            } else {
              return <></>;
            }
          })}
        </SummaryWrap>
      </StyleBox>
      <StyleBox>
        <h1>
          <div>Transactions History: </div>
        </h1>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {HEADER_COLUMNS.map(column => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {Transactions.map(row => {
                const data = {
                  id: row.id,
                  user: getUserByCardId(row.card_id),
                  merchant: getMerchantById(row.merchant_id),
                  cardId: row.card_id,
                  currency: row.merchant_currency,
                  amount: calculateCurrencyConverstion(row.usd_amount)
                };
                return (
                  <TableRow key={row.id} hover role="checkbox" tabIndex={-1}>
                    <TableCell key={row.id} align="center">
                      {data.id}
                    </TableCell>
                    <TableCell>{data.user.name}</TableCell>
                    <TableCell>{data.merchant.name}</TableCell>
                    <TableCell align="center">{data.cardId}</TableCell>
                    <TableCell align="center">{data.currency}</TableCell>
                    <TableCell align="right">
                      <NumberFormat
                        value={data.amount}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                      />
                      <span>{currency}</span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </StyleBox>
    </StyleContainer>
  );
};

export default Home;
