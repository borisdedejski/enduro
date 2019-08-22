using System;
using System.Collections.Generic;
using System.Text;

namespace Enduro.Core.Cars
{
    public class CarLocation
    {
        public Guid CarId{ get; set; }
        public Coordinate Coordinate { get; set; }
        public CarLocation(Guid carId, Coordinate coordinate)
        {
            CarId = carId;
            Coordinate = coordinate;
        }
    }
}
