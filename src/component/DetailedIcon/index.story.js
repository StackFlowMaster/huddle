import React from 'react';
import { ScrollView } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { storiesOf } from '@storybook/react-native';
import DetailedIcon from './DetailedIcon';

storiesOf('DetailedIcon', module).add('Icons', () => (
  <ScrollView>
    <DetailedIcon.AdvancedCare style={{ paddingBottom: 30 }} />
    <DetailedIcon.Allergy style={{ paddingBottom: 30 }} />
    <DetailedIcon.Appointment style={{ paddingBottom: 30 }} />
    <DetailedIcon.Bill style={{ paddingBottom: 30 }} />
    <DetailedIcon.Camera style={{ paddingBottom: 30 }} />
    <DetailedIcon.CarePlan style={{ paddingBottom: 30 }} />
    <DetailedIcon.Condition style={{ paddingBottom: 30 }} />
    <DetailedIcon.Demographic style={{ paddingBottom: 30 }} />
    <DetailedIcon.Doctor style={{ paddingBottom: 30 }} />
    <DetailedIcon.Doctor2 style={{ paddingBottom: 30 }} />
    <DetailedIcon.Education style={{ paddingBottom: 30 }} />
    <DetailedIcon.EmergencyContact style={{ paddingBottom: 30 }} />
    <DetailedIcon.FileMedical style={{ paddingBottom: 30 }} />
    <DetailedIcon.Folder style={{ paddingBottom: 30 }} />
    <DetailedIcon.Hospital style={{ paddingBottom: 30 }} />
    <DetailedIcon.Hospitalization style={{ paddingBottom: 30 }} />
    <DetailedIcon.Insurance style={{ paddingBottom: 30 }} />
    <DetailedIcon.Location style={{ paddingBottom: 30 }} />
    <DetailedIcon.Medication style={{ paddingBottom: 30 }} />
    <DetailedIcon.NoteCreate style={{ paddingBottom: 30 }} />
    <DetailedIcon.NoteCustom style={{ paddingBottom: 30 }} />
    <DetailedIcon.NoteProvider style={{ paddingBottom: 30 }} />
    <DetailedIcon.Other style={{ paddingBottom: 30 }} />
    <DetailedIcon.Procedure style={{ paddingBottom: 30 }} />
    <DetailedIcon.Provider style={{ paddingBottom: 30 }} />
    <DetailedIcon.RelationshipChild style={{ paddingBottom: 30 }} />
    <DetailedIcon.RelationshipCouple style={{ paddingBottom: 30 }} />
    <DetailedIcon.RelationshipOther style={{ paddingBottom: 30 }} />
    <DetailedIcon.RelationshipParent style={{ paddingBottom: 30 }} />
    <DetailedIcon.ResultsTest style={{ paddingBottom: 30 }} />
    <DetailedIcon.ResultsLab style={{ paddingBottom: 30 }} />
    <DetailedIcon.Vitals style={{ paddingBottom: 30 }} />
  </ScrollView>
));
