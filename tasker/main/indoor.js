function indoor() {
    setGlobal('Indoor', 1);
    setGlobal('Outdoor', 0);

    if (parseInt(global('Car'))) {
        performTask('stop_blitzer');
    }
    performTask('regular_checks');
}
indoor()