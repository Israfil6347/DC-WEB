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
import FailedDialogue from 'global_shared/components/dialogues/FailedDialogue';
import SuccessDialogue from 'global_shared/components/dialogues/SuccessDialogue';
import { useState } from 'react';
import { getTotalDays } from '../../utils/calculateDaysAndHours';
import { ForHoursDaysPropType } from './interface/ForHoursDaysInterface';

const ForDays = ({
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
              label="===From Date==="
              name="FromDate"
              value={woooApplicationRequestStates?.FromDate}
              minDate={dayjs().add(
                -woooApplicationRequestStates.BackDateDays,
                'day'
              )}
              // maxDate={dayjs().add(0, 'day')}
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
            <DateSelect
              label="===To Date==="
              name="ToDate"
              // minDate={woooApplicationRequestStates?.FromDate}
              value={woooApplicationRequestStates.ToDate}
              error={woooApplicationRequestStates.Errors.ToDate}
              onChange={(fieldName, fieldValue) => {
                updateWoooApplicationRequestState(
                  fieldName,
                  dayjs(fieldValue).format('ll')
                );
              }}
              disabled={false}
            />
          </LocalizationProvider>

          <MyTextInput
            label={'Total Day(s)'}
            disabled={true}
            value={getTotalDays(
              woooApplicationRequestStates?.FromDate,
              woooApplicationRequestStates?.ToDate
            )}
            name="TotalDay"
            id="TotalDay"
            inputType="text"
            leftIcon={<i className="fa-solid fa-calendar-days"></i>}
            onChangeHandler={() => {}}
          />
        </div>
        <div className="mt-5 grid grid-cols-1 gap-6 md:mt-0 md:w-1/2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateSelect
              label="===Rejoining Date==="
              name="RejoiningDate"
              value={woooApplicationRequestStates.RejoiningDate}
              onChange={(fieldName, fieldValue) => {
                updateWoooApplicationRequestState(
                  fieldName,
                  dayjs(fieldValue).format('ll')
                );
              }}
              error={woooApplicationRequestStates.Errors.RejoiningDate}
              disabled={false}
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
            onChange={(e) => {
              updateWoooApplicationRequestState(e.target.name, e.target.value);
            }}
            rows={3}
            error={woooApplicationRequestStates.Errors.Reason}
            disabled={false}
          />

          {/* if view only then button will not show */}
          {!false && (
            <MyButton
              onClick={() => {
                const { FromTime, ToTime, ...restObj } =
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

export default ForDays;
