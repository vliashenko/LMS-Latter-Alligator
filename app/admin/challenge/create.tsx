import React from 'react'
import { Create, NumberInput, ReferenceInput, SelectInput, SimpleForm, TextInput, required } from "react-admin";

const choicesConfig = [
  { id: 'SELECT', name: 'Обрати один варіант (картки)' },
  { id: 'ASSIST', name: 'Обрати один варіант (список)' }
]

export const CreateChallenge = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="question" validate={[required()]} label='Question' />
        <SelectInput source='type' validate={[required()]} choices={choicesConfig}/>
        <ReferenceInput source='lessonId' reference='lessons' />
        <NumberInput source='order' validate={[required()]} label='Order'/>
      </SimpleForm>
    </Create>
  );
};
