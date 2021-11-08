import React, { useState } from "react";
import styled from "styled-components";

// Components
import NumberFormat from "react-number-format";
import {
  Box,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  OutlinedInput,
  InputAdornment,
  FormControl,
  InputLabel
} from "@mui/material";

// Controls
import DropDown from "./Fields/DropDown";

// Types
import { Currencies } from "../types/Currency";

// Constants
import { HEADER_COLUMNS } from "../constants/header_columns";
import { RATE, USD_RATE, CAD_RATE } from "../constants/currency_rate";

// Helpers
import {
  getUserByCardId,
  getMerchantById,
  getLastTransactionByCardId
} from "../helpers";

// Mocks
import Transactions from "../mocks/transactions";
import Users from "../mocks/users";

// Images
import ArrowImg from "../images/convert-arrow.png";

const StyleContainer = styled(Container)`
  max-width: var(--maxWidth);
  margin: 0 auto;
  padding: 20px 20px;
`;

const StyleBox = styled(Box)`
  padding: 20px;
`;

const ConversionWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyleImg = styled.img`
  max-width: 40px;
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
  const [cadAmount, setCadAmount] = useState(0.0);
  const [usdAmount, setUsdAmount] = useState(0.0);

  const calculateCurrencyConverstion = amount => {
    if (currency === "CAD") {
      return parseFloat(amount * RATE).toFixed(2);
    } else {
      return parseFloat(amount).toFixed(2);
    }
  };

  const convertCurrencyAmount = (type, amount) => {
    let convert_amount = 0.0;

    if (type === "USD") {
      convert_amount = parseFloat(amount * USD_RATE).toFixed(2);
      setCadAmount(convert_amount);
      setUsdAmount(amount);
    } else if (type === "CAD") {
      convert_amount = parseFloat(amount * CAD_RATE).toFixed(2);
      setUsdAmount(convert_amount);
      setCadAmount(amount);
    }
  };

  return (
    <StyleContainer>
      <StyleBox>
        <h1>
          <div>Currency Conversion</div>
        </h1>
        <ConversionWrap>
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="cad-amount">CAD Amount</InputLabel>
            <OutlinedInput
              id="cad-amount"
              name="cad-amount"
              type="number"
              value={cadAmount}
              onChange={e => convertCurrencyAmount("CAD", e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="CAD Amount"
            />
          </FormControl>
          <StyleImg src={ArrowImg} />
          <FormControl fullWidth sx={{ m: 1 }}>
            <InputLabel htmlFor="usd-amount">USD Amount</InputLabel>
            <OutlinedInput
              id="usd-amount"
              name="usd-amount"
              type="number"
              value={usdAmount}
              onChange={e => convertCurrencyAmount("USD", e.target.value)}
              startAdornment={
                <InputAdornment position="start">$</InputAdornment>
              }
              label="USD Amount"
            />
          </FormControl>
        </ConversionWrap>
      </StyleBox>
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
