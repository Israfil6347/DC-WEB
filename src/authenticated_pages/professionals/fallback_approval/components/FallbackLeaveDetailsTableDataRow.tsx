import MyButton from 'global_shared/components/MyButton';
import { CRUDModes } from 'global_shared/data/CRUDModes';
import Moment from 'moment';

interface FallbackLeaveDetailsTableDataRowProps {
  leaveDetails: any;
  index: number;
  setFallbackApprovalStates: any;
  setOpenLeaveApplicationForm: any;
  setMode: any;
}

const FallbackLeaveDetailsTableDataRow: React.FC<
  FallbackLeaveDetailsTableDataRowProps
> = ({
  leaveDetails,
  index,
  setFallbackApprovalStates,
  setOpenLeaveApplicationForm,
  setMode,
}) => {
  const setLeaveHistoryDetailsHandler = () => {
    const temp = {
      LeaveApplicationId: 0,
      LeaveTypeCode: '',
      FallbackEmployeeCode: '',
      FallbackPersonName: '',
      FromDate: '',
      FromTime: '',
      ToDate: '',
      ToTime: '',
      RejoiningDate: '',
      Remarks: '',
      LeaveStageRemarks: '',
      CurrentStage: '',
      ApplicationDate: '',
      Errors: {
        LeaveApplicationId: '',
        LeaveTypeCode: '',
        FallbackEmployeeCode: '',
        FallbackPersonName: '',
        FromDate: '',
        FromTime: '',
        ToDate: '',
        ToTime: '',
        RejoiningDate: '',
        Remarks: '',
        LeaveStageRemarks: '',
        CurrentStage: '',
        ApplicationDate: '',
      },
    };

    temp.FallbackEmployeeCode = leaveDetails?.FallbackEmployeeCode;
    temp.FallbackPersonName = leaveDetails?.FallbackPersonName;
    temp.LeaveTypeCode = leaveDetails?.LeaveTypeCode;
    temp.FromDate = Moment(leaveDetails?.FromDate).format('DD-MMM-YYYY');
    temp.FromTime = leaveDetails?.FromTime;
    temp.ToDate = Moment(leaveDetails?.ToDate).format('DD-MMM-YYYY');
    temp.ToTime = leaveDetails?.ToTime;
    temp.RejoiningDate = Moment(leaveDetails?.RejoiningDate).format(
      'DD-MMM-YYYY'
    );
    temp.Remarks = leaveDetails?.Remarks;
    temp.ApplicationDate = Moment(leaveDetails?.ApplicationDate).format(
      'DD-MMM-YYYY'
    );
    temp.CurrentStage = leaveDetails?.CurrentStage;
    temp.LeaveApplicationId = leaveDetails?.LeaveApplicationId;

    setFallbackApprovalStates(() => {
      return {
        ...temp,
      };
    });

    setOpenLeaveApplicationForm(true);
  };

  return (
    <tr className="border-b bg-white" id={`FallbackLeaveDetails_${index}`}>
      <td className="px-6 py-4"># {index}</td>
      <td className="px-6 py-4" id="EmployeeName">
        {leaveDetails?.EmployeeName}
      </td>
      <td className="px-6 py-4" id="ApplicationDate">
        {Moment(leaveDetails?.ApplicationDate).format('DD-MMM-YYYY')}
      </td>
      <td className="px-6 py-4">{leaveDetails.LeaveType}</td>
      <td className="px-6 py-4" id="FromDate">
        {Moment(leaveDetails?.FromDate).format('DD-MMM-YYYY')}
      </td>
      <td className="px-6 py-4" id="ToDate">
        {Moment(leaveDetails?.ToDate).format('DD-MMM-YYYY')}
      </td>
      <td className="px-6 py-4" id="RejoiningDate">
        {Moment(leaveDetails?.RejoiningDate).format('DD-MMM-YYYY')}
      </td>
      <td className="px-6 py-4" id="CurrentStage">
        {leaveDetails?.CurrentStage}
      </td>
      <td className="px-6 py-4 ">
        <MyButton
          name="Submit"
          label=""
          styleClass="w-8 flex justify-center rounded border py-2 mr-5 font-semibold uppercase text-onPrimary hover:scale-105 bg-primary"
          onClick={() => {
            setLeaveHistoryDetailsHandler();
            setMode(CRUDModes.View);
          }}
          type={undefined}
          id="LeaveHistoryDetailsHandler"
        >
          <i className="fa-solid fa-eye"></i>
        </MyButton>
      </td>
      <td className="px-6 py-4 ">
        <MyButton
          name="Submit"
          id="LeaveHistoryDetails"
          label="LeaveHistoryDetails"
          styleClass="w-8 flex justify-center rounded border py-2 mr-5 font-semibold uppercase text-onPrimary hover:scale-105 bg-primary"
          onClick={() => {
            setLeaveHistoryDetailsHandler();
            setMode(CRUDModes.Approve);
          }}
          type={undefined}
        >
          <i className="fa-regular fa-circle-check mt-1"></i>
        </MyButton>
      </td>
    </tr>
  );
};

export default FallbackLeaveDetailsTableDataRow;
