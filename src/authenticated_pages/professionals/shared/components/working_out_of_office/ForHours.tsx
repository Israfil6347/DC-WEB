import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { WoooApplicationRequestState } from 'authenticated_pages/professionals/working_out_of_office/hooks/useWoooApplicationRequestStates';
import { validateWoooApplicationRequestState } from 'authenticated_pages/professionals/working_out_of_office/validation/validateWoooApplicationRequestState';
import dayjs from 'dayjs';
import DateSelect from 'global_shared/components/DateSelect';
import MyButton from 'global_shared/components/MyButton';
import MyDropdown from 'global_shared/components/MyDropdown';
import MyTextInput from 'global_shared/components/MyTextInput';
import MyTextarea from 'global_shared/components/MyTextarea';
import TimeSelect from 'global_shared/components/TimeSelect';
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import moment from 'moment';
import { useState } from 'react';
import { getTotalHours } from '../../utils/calculateDaysAndHours';
import { ForHoursDaysPropType } from './interface/ForHoursDaysInterface';

const ForHours = ({
  updateWoooApplicationRequestState,
  woooApplicationRequestStates,
  selectWoooTypeData,
  submitWoooApplicationHandler,
  woooResponseStatus,
  woooResponseData,
  woooResponseMessage,
  closeModal,
}: ForHoursDaysPropType) => {
  const [successDialogueIsOpen, setSuccessDialogueIsOpen] =
    useState<boolean>(false);
  const [failedDialogueIsOpen, setFailedDialogueIsOpen] =
    useState<boolean>(false);

  return (
    <>
      <SuccessDialogue
        isDialogueOpen={
          woooResponseStatus === 'success' && successDialogueIsOpen
        }
        onOkButtonClick={() => {
          setSuccessDialogueIsOpen(false);

          closeModal && closeModal();
        }}
      >
        {woooResponseData}
      </SuccessDialogue>

      {/* For Hours Failed Dialogue */}
      <FailedDialogue
        isDialogueOpen={woooResponseStatus === 'failed' && failedDialogueIsOpen}
        onCloseButtonClick={() => {
          setFailedDialogueIsOpen(false);
        }}
      >
        {woooResponseMessage}
      </FailedDialogue>

      <div className="flex flex-col pb-6 pt-10 md:flex-row">
        <div className="grid grid-cols-1 gap-6 md:mr-5 md:w-1/2">
          {/* <MyDropdown
            label="===Select Type==="
            name="WoooTypeCode"
            id="WoooTypeCode"
            value={woooApplicationRequestStates?.WoooTypeCode}
            dropDownData={selectWoooTypeData?.map((item, i) => {
              return {
                id: i,
                label: item?.WoooTypeName,
                value: item?.WoooTypeCode,
              };
            })}
            required={true}
            onChange={(e) => {
              updateWoooApplicationRequestState('WoooTypeCode', e.target.value);
            }}
            error={woooApplicationRequestStates.Errors.WoooTypeCode}
            disabled={false}
            leftIcon={<i className="fa-solid fa-briefcase"></i>}
          /> */}
          <MyDropdown
            label="===Select Type==="
            name="WoooTypeCode"
            id="WoooTypeCode"
            value={woooApplicationRequestStates?.WoooTypeCode}
            dropDownData={selectWoooTypeData?.map((item, i) => {
              return {
                id: i,
                label: item?.WoooTypeName,
                value: item?.WoooTypeCode,
              };
            })}
            required={true}
            onChange={(event) => {
              const selected = selectWoooTypeData?.find((obj) => {
                if (parseInt(event.target.value) === parseInt(obj.WoooTypeCode))
                  return obj;
              });

              updateWoooApplicationRequestState(
                'WoooTypeCode',
                selected?.WoooTypeCode
              );
              updateWoooApplicationRequestState(
                'BackDateDays',
                selected?.BackDateDays
              );
            }}
            error={woooApplicationRequestStates.Errors.WoooTypeCode}
            disabled={false}
            leftIcon={<i className="fa-solid fa-briefcase"></i>}
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateSelect
              label="===Date==="
              name="FromDate"
              value={woooApplicationRequestStates?.FromDate}
              minDate={dayjs().add(
                -woooApplicationRequestStates.BackDateDays,
                'day'
              )}
              maxDate={dayjs().add(0, 'day')}
              onChange={(fieldName, fieldValue) => {
                updateWoooApplicationRequestState(
                  fieldName,
                  dayjs(fieldValue).format('ll')
                );
              }}
              error={woooApplicationRequestStates?.Errors?.FromDate}
              disabled={
                woooApplicationRequestStates.BackDateDays === '' ? true : false
              }
            />
          </LocalizationProvider>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <TimeSelect
                label="===From Time==="
                name="FromTime"
                value={woooApplicationRequestStates.FromTime}
                onChange={(value) => {
                  const time = dayjs(value).format('LT');
                  const time24 = moment(time, 'hh:mm:ss A').format('HH:mm:ss');

                  updateWoooApplicationRequestState('FromTime', time24);
                }}
                error={woooApplicationRequestStates.Errors.FromTime}
                disabled={false}
              />

              <TimeSelect
                label="===To Time==="
                name="ToTime"
                value={woooApplicationRequestStates.ToTime}
                onChange={(value) => {
                  const time = dayjs(value).format('LT');
                  const time24 = moment(time, 'hh:mm:ss A').format('HH:mm:ss');

                  updateWoooApplicationRequestState('ToTime', time24);
                }}
                error={woooApplicationRequestStates.Errors.ToTime}
                disabled={false}
              />
            </div>
          </LocalizationProvider>

          <MyTextInput
            label={'Total Hour(s)'}
            disabled={true}
            id="totalHour"
            value={getTotalHours(
              woooApplicationRequestStates.FromTime,
              woooApplicationRequestStates.ToTime
            )}
            name="totalHour"
            inputType="text"
            leftIcon={<i className="fa-solid fa-clock"></i>}
            onChangeHandler={() => {}}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 md:mt-0 md:w-1/2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateSelect
              disabled={true}
              label="===Rejoining Date==="
              name="RejoiningDate"
              value={woooApplicationRequestStates?.FromDate}
              onChange={() => {}}
            />
          </LocalizationProvider>

          {/* {viewOnly && (
          <MyInputBox
            label={'Status'}
            disabled={true}
            value={state?.Status}
            name="totalHour"
            inputType="text"
          />
        )} */}

          <MyTextarea
            required={true}
            label="Reason"
            name="Reason"
            id="Reason"
            value={woooApplicationRequestStates.Reason}
            error={woooApplicationRequestStates.Errors.Reason}
            onChange={(e) => {
              updateWoooApplicationRequestState(e.target.name, e.target.value);
            }}
            rows={3}
            disabled={false}
          />

          {/* if view only then button will not show */}
          {!false && (
            <MyButton
              onClick={() => {
                const { RejoiningDate, ToDate, ...restObj } =
                  woooApplicationRequestStates;

                let errors = '';

                for (var fieldName in restObj) {
                  updateWoooApplicationRequestState(
                    fieldName,
                    woooApplicationRequestStates[
                      fieldName as keyof WoooApplicationRequestState
                    ]
                  );

                  errors =
                    errors +
                    validateWoooApplicationRequestState(
                      fieldName,
                      woooApplicationRequestStates[
                        fieldName as keyof Omit<
                          WoooApplicationRequestState,
                          'Errors' | 'IsHourly'
                        >
                      ]
                    );
                }

                if (errors?.length !== 0) {
                  return;
                }

                setSuccessDialogueIsOpen(true);
                setFailedDialogueIsOpen(true);
                submitWoooApplicationHandler();
              }}
              id="submitWoooApplication"
              name="Submit"
              label="submit"
              type="button"
              styleClass="w-full rounded border py-2 font-semibold uppercase text-onPrimary hover:scale-105 bg-primary"
            />
          )}
        </div>
      </div>
    </>
  );
};

export default ForHours;
