import React from 'react'
import { List, Datagrid, TextField, ReferenceField, NumberField, SelectField } from "react-admin";

const choicesConfig = [
  { id: 'SELECT', name: 'Обрати один варіант (картки)' },
  { id: 'ASSIST', name: 'Обрати один варіант (список)' }
]

export const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="question" />
        <SelectField source='type' choices={choicesConfig}/>
        <ReferenceField source='lessonId' reference='lessons'/>
        <NumberField source='order'/>
      </Datagrid>
    </List>
  );
};
