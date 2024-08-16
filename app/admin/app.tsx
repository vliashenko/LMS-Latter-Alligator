"use client";

import { Admin, Resource } from "react-admin";
import simpleRestProvider from "ra-data-simple-rest";

import { CourseList } from "./course/list";
import { CreateCourse } from "./course/create";
import { EditCourse } from "./course/edit";

import { UnitList } from "./unit/list";
import { CreateUnit } from "./unit/create";
import { EditUnit } from "./unit/edit";

import { LessonList } from "./lesson/list";
import { CreateLesson } from "./lesson/create";
import { EditLesson } from "./lesson/edit";

import { ChallengeList } from "./challenge/list";
import { CreateChallenge } from "./challenge/create";
import { EditChallenge } from "./challenge/edit";

import { ChallengeOptionList } from "./challengeOption/list";
import { CreateChallengeOption } from "./challengeOption/create";
import { EditChallengeOption } from "./challengeOption/edit";

const dataProvider = simpleRestProvider("/api");

export default function AdminPage() {
  return (
    <Admin dataProvider={dataProvider}>
      <Resource
        name="courses"
        list={CourseList}
        create={CreateCourse}
        edit={EditCourse}
        recordRepresentation="title"
      />
      <Resource
        name="units"
        list={UnitList}
        create={CreateUnit}
        edit={EditUnit}
        recordRepresentation="title"
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={CreateLesson}
        edit={EditLesson}
        recordRepresentation="title"
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={CreateChallenge}
        edit={EditChallenge}
        recordRepresentation="question"
      />
      <Resource
        name="challengeOptions"
        list={ChallengeOptionList}
        create={CreateChallengeOption}
        edit={EditChallengeOption}
        recordRepresentation="text"
        options={{ label: 'Challenge Options' }}
      />
    </Admin>
  );
}
