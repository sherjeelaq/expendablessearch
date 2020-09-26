import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState, useEffect } from "react";
import "./KnowledgePanel.css";
import LanguageIcon from "@material-ui/icons/Language";
const useStyles = makeStyles({
  root: {
    maxWidth: 250,
  },
  media: {
    height: 140,
  },
});

function KnowledgePanel({ knowledgeGraphResults }) {
  const [data, setData] = useState();

  const classes = useStyles();
  useEffect(() => {
    const dataSetting = async () => {
      await setData(knowledgeGraphResults);
    };
    dataSetting();
  }, []);
  return (
    <Card className={`${classes.root} knowledgePanel`}>
      {knowledgeGraphResults?.image != undefined ? (
        <img
          className="knowledgePanel__image"
          src={knowledgeGraphResults?.image.contentUrl}
          alt={knowledgeGraphResults?.name}
        />
      ) : (
        ""
      )}

      <CardContent>
        <Typography variant="h5" component="h2">
          {knowledgeGraphResults?.name}
        </Typography>
        {knowledgeGraphResults?.description != undefined ? (
          <Typography variant="subtitle1" color="textSecondary" component="h4">
            {knowledgeGraphResults?.description}
          </Typography>
        ) : (
          ""
        )}
      </CardContent>
      <Divider />
      {knowledgeGraphResults?.url != undefined ? (
        <>
          <CardContent>
            <Typography
              className="knowledgeGraph__url"
              variant="subtitle1"
              color="textPrimary"
              component="p"
            >
              <LanguageIcon />
              <a href={knowledgeGraphResults?.url}>
                {knowledgeGraphResults?.url}
              </a>
            </Typography>
          </CardContent>
          <Divider />
        </>
      ) : (
        ""
      )}
      {knowledgeGraphResults?.detailedDescription != undefined ? (
        <CardContent>
          <Typography variant="subtitle1" color="textPrimary" component="p">
            {`${knowledgeGraphResults?.detailedDescription.articleBody} - `}
            <a href={knowledgeGraphResults?.detailedDescription.url}>
              Learn More
            </a>
          </Typography>
        </CardContent>
      ) : (
        ""
      )}
    </Card>
  );
}

export default KnowledgePanel;
