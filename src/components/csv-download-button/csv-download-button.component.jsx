import React from 'react';
import { CSVLink } from 'react-csv';
import './csv-download-button.scss';
import { FiDownload } from 'react-icons/fi';

const CsvDownloadButton = (data) => {
    return (
        <div className="csv-button">
            < CSVLink
                data={data.data}
                filename={'data.csv'}
                className="btn btn-primary"
                target="_blank"
            >
                <FiDownload/>{' CSV'}
            </CSVLink >
            
        </div>
    )
};

export default CsvDownloadButton;