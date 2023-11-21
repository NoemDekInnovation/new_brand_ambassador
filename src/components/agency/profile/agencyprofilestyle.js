import styled from 'styled-components';

export const ProfileContainer = styled.div` 
    width: 100%;
    height: 100%;
    display: flex;
    /* flex-direction: column; */
    /* align-content: center; */
    justify-content: center;
    align-items: center;
    /* background: #FFFFFF; */
    /* margin: 24px 24px 0px 24px; */
    .body{
        width: 1130px;
        height: 800px;
        display: flex;
        /* flex-direction: column; */
        /* align-items: center; */
        justify-content: center;
        background: #FFFFFF;    
        padding: 24px 24px 0px 24px;

    }
    .card{
        width: 240px;
        height: 198px;
        display: flex;
        flex-direction: column;
        background: #FFFFFF;    
        padding: 24px 24px 0px 24px;
    }
   .text2{
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    padding: 12px 0px 12px 0px;
   }
   .text1{
    font-size: 16px;
    font-weight: 500px;
    font-style: normal;
   }
   .split{
    display: flex;
    justify-content: space-between;
    gap:12px;
   }
   .header{
    width: 808px;
    height:30px;
   }

.head-text{
    font-size: 16px;
    font-weight: 500px;
    font-style: normal;
    padding: 0px 0px 12px 0px;
}

    `;