<!DOCTYPE html>
<html>
<head>
    <title>Exporter PDF Dynamique</title>
</head>
<body>
    <h2>Exporter un rapport PDF</h2>

    <form action="{{ url('/export/pdf') }}" method="POST">
        @csrf <!-- ✅ CSRF TOKEN OBLIGATOIRE -->
        
        <label>Nom de la table :</label>
        <input type="text" name="table" placeholder="Ex: ARTICLES" required><br><br>

        <label>Colonnes (séparées par des virgules) :</label>
        <input type="text" name="columns" placeholder="Ex: ART_CODE,ART_LIB" required><br><br>

        <button type="submit">Générer PDF</button>
    </form>
</body>
</html>
