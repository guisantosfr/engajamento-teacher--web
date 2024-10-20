import { Box, Button, Container, FormControl, FormLabel, Grid, OutlinedInput } from "@mui/material";
import { Save } from '@mui/icons-material';
import { useState } from "react";
import { read, utils } from 'xlsx';
import QuestionCard from "../components/QuestionCard";

const saveQuiz = () => {
    console.log('SALVEI O QUIZ');
}

export default function NewQuiz() {
    const [data, setData] = useState(null);
    const [visible, setVisible] = useState(false);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onload = (event) => {
            const workbook = read(event.target.result, { type: 'binary' });
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];

            const sheetData = utils.sheet_to_json(sheet, { header: 1 });

            setData(sheetData);
        };

        reader.readAsBinaryString(file);
    };

    return (
        <div>
            <h2>Novo questionário</h2>

            <Grid container direction="column" spacing={3}>
                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="quiz">Nome do questionário</FormLabel>
                        <OutlinedInput id="quiz" name="quiz" type="quiz" placeholder="Nome do questionário" aria-describedby="Nome do questionário" required size="medium" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <FormControl>
                        <FormLabel htmlFor="description">Descrição</FormLabel>
                        <OutlinedInput id="description" name="description" type="description" placeholder="Descrição do questionário" aria-describedby="nome-da-turma" required size="medium" />
                    </FormControl>
                </Grid>

                <Grid item xs={4}>
                    <input
                        type="file"
                        accept=".xls, .xlsx, .ods, .csv"
                        onChange={handleFileUpload} />

                    {data && (
                        <Container sx={{ my: 4 }}>

                            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '35%' }}>
                                <h2>Dados do questionário:</h2>
                                {
                                    visible ? (
                                        <Button variant="text" onClick={() => setVisible(!visible)}>Ocultar</Button>
                                    ) : (
                                        <Button variant="text" onClick={() => setVisible(!visible)}>Ver</Button>

                                    )
                                }
                            </Box>

                            {
                                visible && (
                                    <>
                            <h3>Número de questões: {data.length}</h3>
                            <Grid container spacing={4}>

                                {data.map((item, index) => (
                                    <QuestionCard key={index} question={item[0]} answer={item[1]} subject={item[2]} />
                                ))}

                            </Grid>
</>
                                )
                            }

                        </Container>
                    )}
                </Grid>

                <Grid item xs={4}>
                    <Button
                        variant="contained"
                        startIcon={<Save />}
                        onClick={saveQuiz}>
                        Salvar Questionário
                    </Button>
                </Grid>

            </Grid>

        </div>
    )
}
