import { Box, Stack, Typography, styled, List, ListItem } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { PopoverButton } from '../button/PopoverButton';
import { BalanceWidget } from '../balance-widget/BalanceWidget';
import formatPrice from '../../utils/formatPrice';
import { IRootReducerState } from '../../redux/IRootReducer';

const StyledHeader = styled(Typography)({
  fontWeight: 600,
  fontSize: 20,
  color: '#1D2939',
  marginBottom: 20
});

const StackContainer = styled(Stack)({
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%'
});

const TitleText = styled(Typography)({
  fontWeight: 600,
  fontSize: 18,
  color: '#344054'
});

const StyledListItem = styled(ListItem)({
  padding: 0,
  flex: 1,
  '&:not(:last-child)': {
    marginBottom: 25
  }
});

const ItemText = styled(Typography)({
  color: '#667085',
  fontWeight: 500,
  fontSize: 16
});

export const SalesInsight: React.FC = () => {
  const { salesCountWidget } = useSelector((state: IRootReducerState) => state.insight);

  const [selected, setSelected] = React.useState<string>('today');

  const handleSelect = (value: string) => {
    setSelected(value);
  };

  return (
    <Box>
      <Stack direction='row' alignItems={'center'} justifyContent={'flex-end'}>
        <PopoverButton
          label='Today'
          data={[
            { label: 'Today', value: 'today' },
            { label: 'Yesterday', value: 'yesterday' },
            { label: 'Last 7 days', value: 'last-7-days' },
            { label: 'Last 30 days', value: 'last-30-days' },
            { label: 'This month', value: 'this-month' },
            { label: 'Last month', value: 'last-month' },
            { label: 'Custom', value: 'custom' }
          ]}
          selected={selected}
          popoverAction={handleSelect}
          showSelected={false}
        />
      </Stack>

      <Box marginTop={3}>
        <Box marginBottom={5} display={'flex'} gap={'20px'} width={'100%'}>
          <Box flexGrow={1}>
            <BalanceWidget
              label='Total sales today'
              amount={salesCountWidget['Top Sales Today'] || 0}
              analytics={{
                label: 'Total Income',
                amount: salesCountWidget['Top Sales Today'],
                percentage: 0.5,
                type: 'increase'
              }}
            />
          </Box>
          <Box flexGrow={1}>
            <BalanceWidget
              label='Gross sales'
              amount={salesCountWidget['Top Gross'] || 0}
              analytics={{
                label: 'Total Income',
                amount: salesCountWidget['Top Gross'],
                percentage: 0.5,
                type: 'increase'
              }}
            />
          </Box>
          <Box flexGrow={1}>
            <BalanceWidget
              label='Total order'
              amount={salesCountWidget['Total Order'] || 0}
              type='integer'
              analytics={{
                label: 'Total Income',
                amount: salesCountWidget['Total Order'],
                percentage: 0.5,
                type: 'decrease'
              }}
            />
          </Box>
        </Box>

        <Box>
          <StyledHeader>Sales analysis</StyledHeader>
          <Box>
            <List sx={{ width: '100%' }}>
              <StyledListItem>
                <StackContainer>
                  <TitleText>Gross Sales</TitleText>
                  <TitleText>{formatPrice(3000)}</TitleText>
                </StackContainer>
              </StyledListItem>

              <Box paddingLeft={2} mb={3}>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Returns</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Discount</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Unfulfilled order</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Go-Geeper fees</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
              </Box>
              <StyledListItem>
                <StackContainer>
                  <TitleText>Net Sales</TitleText>
                  <TitleText>{formatPrice(3000)}</TitleText>
                </StackContainer>
              </StyledListItem>
            </List>
          </Box>
        </Box>

        <Box marginTop={5}>
          <StyledHeader>Settlements</StyledHeader>
          <Box>
            <List sx={{ width: '100%' }}>
              <StyledListItem>
                <StackContainer>
                  <TitleText>Net Sales</TitleText>
                  <TitleText>{formatPrice(3000)}</TitleText>
                </StackContainer>
              </StyledListItem>

              <Box paddingLeft={2} mb={3}>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Total collected</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
                <StyledListItem>
                  <StackContainer>
                    <ItemText>Pending settlement</ItemText>
                    <ItemText>{formatPrice(3000)}</ItemText>
                  </StackContainer>
                </StyledListItem>
              </Box>
            </List>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
