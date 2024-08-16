import React from 'react'
import { Edit, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

const choicesConfig = [
  { id: 'SELECT', name: 'Обрати один варіант (картки)' },
  { id: 'ASSIST', name: 'Обрати один варіант (список)' }
]

export const EditChallenge = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label='Question' />
        <SelectInput source='type' validate={[required()]} choices={choicesConfig}/>
        <ReferenceInput source='lessonId' reference='lessons' />
        <NumberInput source='order' validate={[required()]} label='Order'/>
      </SimpleForm>
    </Edit>
  );
};
