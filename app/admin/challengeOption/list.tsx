import React from 'react'
import { List, Datagrid, TextField, ReferenceField, NumberField, BooleanField } from "react-admin";

export const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="text" />
        <BooleanField source='correctOption'/>
        <ReferenceField source='challengeId' reference='challenges'/>
        <TextField source='imageSrc'/>
        <TextField source='audioSrc'/>
      </Datagrid>
    </List>
  );
};
